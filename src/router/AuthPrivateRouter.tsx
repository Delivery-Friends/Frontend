import { Navigate, Outlet } from 'react-router-dom';

const AuthPrivateRouter = () => {
  const authenticated = localStorage.getItem('refreshToken');

  return !authenticated ? <Navigate to="/login" /> : <Outlet />;
};

export default AuthPrivateRouter;
