import { FormEvent, useCallback, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userJoin } from '../../api/kakaoLogin';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import classes from './signup.module.scss';

const Signup = () => {
  const navigate = useNavigate();
  const userNameRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);

  const [isValidUserName, setIsValidUserName] = useState(false);
  const [checkUserNameMsg, setCheckUserNameMsg] = useState('');

  const [isValidNickName, setIsValidNickName] = useState(false);
  const [checkNickNameMsg, setCheckNickNameMsg] = useState('');

  const { state } = useLocation();
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const joinData = {
      name: userNameRef.current?.value,
      nickname: nickNameRef.current?.value,
      kakaoId: state.kakaoId,
    };

    await userJoin(joinData);
    // 회원가입 후 로그인 창으로 이동
    navigate('/login');
  };

  const handleChangeUserName = useCallback(() => {
    const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;

    if (userNameRef.current) {
      if (regExp.test(userNameRef.current.value)) {
        setCheckUserNameMsg('특수문자는 입력할 수 없습니다.');
        setIsValidUserName(false);
      } else if (
        userNameRef.current.value.length > 5 ||
        (userNameRef.current.value.length < 2 &&
          userNameRef.current.value !== '')
      ) {
        setCheckUserNameMsg('2자~5자 이내여야 합니다.');
        setIsValidUserName(false);
      } else if (userNameRef.current.value === '') {
        setCheckUserNameMsg('');
        setIsValidUserName(false);
      } else {
        setCheckUserNameMsg('');
        setIsValidUserName(true);
      }
    }
  }, []);

  const handleChangeNickName = useCallback(() => {
    const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;

    if (nickNameRef.current) {
      if (regExp.test(nickNameRef.current.value)) {
        setCheckNickNameMsg('특수문자는 입력할 수 없습니다.');
        setIsValidNickName(false);
      } else if (
        nickNameRef.current.value.length > 10 ||
        (nickNameRef.current.value.length < 2 &&
          nickNameRef.current.value !== '')
      ) {
        setCheckNickNameMsg('2자~10자 이내여야 합니다.');
        setIsValidNickName(false);
      } else if (nickNameRef.current.value === '') {
        setCheckNickNameMsg('');
        setIsValidNickName(false);
      } else {
        setCheckNickNameMsg('');
        setIsValidNickName(true);
      }
    }
  }, []);

  const submitPass = isValidNickName && isValidUserName;

  return (
    <section className={classes.signup}>
      <form onSubmit={submitHandler}>
        <Input
          input={{
            id: 'username',
            error: checkUserNameMsg,
            onChange: handleChangeUserName,
          }}
          ref={userNameRef}
          label="사용자 이름"
        />
        <Input
          input={{
            id: 'nickname',
            error: checkNickNameMsg,
            onChange: handleChangeNickName,
          }}
          ref={nickNameRef}
          label="닉네임"
        />
        <Button disabled={!submitPass} size="lg">
          회원가입
        </Button>
      </form>
    </section>
  );
};

export default Signup;
