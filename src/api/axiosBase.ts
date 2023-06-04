import axios, { AxiosRequestConfig } from 'axios';
import { getRefreshToken } from './kakaoLogin';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'https://jaehwan.shop/api/',
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
  withCredentials: true,
});

accessInstance.interceptors.request.use(
  (config: any) => {
    //요청시 accessToken 계속보내주기
    const accessToken = localStorage.getItem('accessToken');
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
    return response;
  },
  async error => {
    const { response } = error;
    const { data } = response;
    if (data.statusCode === 10003) {
      const { data } = await getRefreshToken();
      if (data.statusCode === 10003) {
        // refreshToken만료
        localStorage.clear();
        window.location.replace('/login');
      } else if (data.payload) {
        // accessToken재발급
        localStorage.setItem('accessToken', data.payload.accessToken);
        localStorage.setItem('refreshToken', data.payload.refreshToken);
        response.config.headers[
          'ACCESS-TOKEN'
        ] = `Bearer ${data.payload.accessToken}`;

        return await accessInstance(response.config);
      }
    }
  }
);
