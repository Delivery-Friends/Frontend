import useAuthContext from './useAuthContext';
import { accessInstance } from '../api/axiosBase';
import { removeCookie, setCookie } from '../util/cookie';
import { getRefreshToken } from '../api/kakaoLogin';
import { useEffect } from 'react';

const useAuthInterceptors = () => {
  const { accessToken, login, logout } = useAuthContext();
  // 요청 전 처리
  const requestInterceptor = accessInstance.interceptors.request.use(
    (config: any) => {
      //요청시 accessToken 보내주기
      if (!accessToken) {
        config.headers['REFRESH-TOKEN'] = null;
        config.headers['ACCESS-TOKEN'] = null;
        return config;
      }

      if (config.headers && accessToken) {
        config.headers['ACCESS-TOKEN'] = `Bearer ${accessToken}`;
        return config;
      }
    },
    async err => {
      return Promise.reject(err);
    }
  );
  // 응답 후 처리
  const responseInterceptor = accessInstance.interceptors.response.use(
    async response => {
      return response;
    },
    async error => {
      const { response } = error;
      // access토큰이 만료된 경우
      const { data } = response;
      if (data.statusCode === 10003) {
        const { data: refreshdata } = await getRefreshToken();
        if (refreshdata.statusCode === 10003) {
          // refresh토큰이 만료된 경우 로그아웃 및 전역 로그인 토큰 초기화
          removeCookie('refreshToken');
          logout();
          window.location.replace('/login');
        } else if (refreshdata.statusCode === 200) {
          // refresh토큰을 통한 재발급 refresh쿠기에 저장, access토큰 전역관리 로그인 유지
          await removeCookie('refreshToken');
          await setCookie('refreshToken', refreshdata.payload.refreshToken, {
            path: '/',
          });
          login(refreshdata.payload.accessToken);
          // headers 재발급받은 accessToken을 사용해서 해당 API 재요청
          response.config.headers[
            'ACCESS-TOKEN'
          ] = `Bearer ${refreshdata.payload.accessToken}`;

          return await accessInstance(response.config);
        } else {
          return Promise.reject(error);
        }
      }
    }
  );

  useEffect(() => {
    return () => {
      accessInstance.interceptors.request.eject(requestInterceptor);
      accessInstance.interceptors.request.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
};

export default useAuthInterceptors;
