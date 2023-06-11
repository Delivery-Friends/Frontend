import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userKakaoLogin } from '../../api/kakaoLogin';
import classes from './login.module.scss';

import { FadeLoader } from 'react-spinners';
import useAuthContext from '../../hook/useAuthContext';
import { setCookie } from '../../util/cookie';

const LoginKakao = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      const loginAPI = async () => {
        const payload = await userKakaoLogin(code);
        if (payload.kakaoId) {
          navigate('/signup', { state: { kakaoId: payload.kakaoId } });
        } else {
          // localStorage.setItem('accessToken', payload.accessToken);
          // localStorage.setItem('refreshToken', payload.refreshToken);
          setCookie('refreshToken', payload.refreshToken, {
            path: '/',
          });
          login(payload.accessToken);
          navigate('/');
        }
      };
      loginAPI();
    }
  }, [navigate, login]);

  return (
    <div className={classes.spinner}>
      <FadeLoader color="#5f4ef7" />
    </div>
  );
};

export default LoginKakao;
