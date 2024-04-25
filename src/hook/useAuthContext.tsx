import { useContext } from 'react';
import { authContext } from '../context/auth/Auth';

const useAuthContext = () => {
  const { accessToken, login, logout } = useContext(authContext);

  return { accessToken, login, logout };
};

export default useAuthContext;
