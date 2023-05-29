import Button from '../../components/common/Button/Button';
import classes from './login.module.scss';

const Login = () => {
  const loginHandler = async () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code`;
  };

  return (
    <section className={classes.login}>
      <h2>Delivery-Friends 로그인</h2>
      <p>배달 프렌즈를 사용해주셔서 감사합니다.</p>
      <Button size="lg" onClick={loginHandler}>
        <img src="/image/userImage/kakao.png" alt="카카오로고" />
        카카오톡으로 로그인
      </Button>
      <p className={classes.gray}>처음 회원가입을 하시는 건가요?</p>
    </section>
  );
};

export default Login;
