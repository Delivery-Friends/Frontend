import useAuthContext from '../../hook/useAuthContext';
import { accessInstance } from '../../api/axiosBase';
import { useEffect } from 'react';
import { removeCookie, setCookie } from '../../util/cookie';
import { getRefreshToken } from '../../api/kakaoLogin';

const Interceptor = ({ children }: { children: React.ReactNode }) => {
  const { auth, login } = useAuthContext();

  useEffect(() => {
    accessInstance.interceptors.request.use(
      (config: any) => {
        const accessToken = auth.accessToken;
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
    accessInstance.interceptors.response.use(
      async response => {
        if (response.data.message === 'JWT가 만료되었습니다.') {
          const { data } = await getRefreshToken();
          if (data.payload) {
            // console.log('access토큰재발급');
            login(data.payload.accessToke);
            setCookie('refreshToken', data.payload.refreshToken);
            response.config.headers['REFRESH-TOKEN'] = data.payload.accessToken;
            return await accessInstance(response.config);
          } else if (data.message === 'JWT가 만료되었습니다.') {
            // console.log('refresh토큰만료');
            removeCookie('refreshToken');
            window.location.replace('/login');
          }
        }
        return response;
      },
      async error => {
        // const { config, response } = error;
      }
    );
  }, [auth, login]);

  return <>{children}</>;
};

export default Interceptor;
