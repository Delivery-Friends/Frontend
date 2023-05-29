import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userKakaoLogin } from '../../api/kakaoLogin';
import classes from './login.module.scss';

import { FadeLoader } from 'react-spinners';
const LoginKakao = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      const login = async () => {
        const payload = await userKakaoLogin(code);
        if (payload.kakaoId) {
          navigate('/signup', { state: { kakaoId: payload.kakaoId } });
        } else {
          navigate('/');
        }
      };
      login();
    }
  }, [navigate]);

  return (
    <div className={classes.spinner}>
      <FadeLoader color="#5f4ef7" />
    </div>
  );
};

export default LoginKakao;
