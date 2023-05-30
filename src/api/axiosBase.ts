import axios, { AxiosRequestConfig } from 'axios';
import { getRefreshToken } from './kakaoLogin';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://jaehwan.shop:9000/',
};

export const instance = axios.create({
  baseURL: axiosConfig.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const accessInstance = axios.create({
  baseURL: axiosConfig.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

accessInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem('accessToken');

    //요청시 accessToken 계속보내주기
    if (!accessToken) {
      config.headers['REFRESH-TOKEN'] = null;
      config.headers['ACCESS-TOKEN'] = null;
      return config;
    }

    if (config.headers && accessToken) {
      config.headers['ACCESS-TOKEN'] = `${accessToken}`;
      return config;
    }
  },
  async err => {
    // console.log('통신에러발생');
    return Promise.reject(err);
  }
);

accessInstance.interceptors.response.use(
  async response => {
    if (response.data.message === 'JWT가 만료되었습니다.') {
      const { data } = await getRefreshToken();
      if (data.payload) {
        // console.log('access토큰재발급');
        localStorage.setItem('accessToken', data.payload.accessToken);
        localStorage.setItem('refreshToken', data.payload.refreshToken);
        response.config.headers['REFRESH-TOKEN'] = data.payload.accessToken;
        return await accessInstance(response.config);
      } else if (data.message === 'JWT가 만료되었습니다.') {
        // console.log('refresh토큰만료');
        await localStorage.clear();
        window.location.replace('/login');
      }
    }
    return response;
  },
  async error => {
    // const { config, response } = error;
    // console.log(config, response);
  }
);
