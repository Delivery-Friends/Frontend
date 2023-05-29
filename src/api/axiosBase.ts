import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://jaehwan.shop:9000/',
};

export const instance = axios.create({
  baseURL: axiosConfig.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
