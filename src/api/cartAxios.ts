import { accessInstance } from './axiosBase';

export const userCart = async () => {
  const { data } = await accessInstance.get('/user/cart');
  return data.payload;
};
