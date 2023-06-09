import axios from 'axios';
import { instance } from './axiosBase';
import { getCookie } from '../util/cookie';

export interface JoinDataType {
  name?: string;
  nickname?: string;
  kakaoId: string;
}

// 카카오서버 로그인
export const userKakaoLogin = async (code: string) => {
  const type = 'authorization_code';
  const res = await axios.post(
    `https://kauth.kakao.com/oauth/token?grant_type=${type}&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&code=${code}`,
    {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }
  );
  const { access_token } = res.data;
  return userLogin(access_token);
};

// 서버 로그인
const userLogin = async (access_token: string) => {
  const res = await instance.get(
    `/oauth/kakao/login?accessToken=${access_token}`
  );
  return res.data.payload;
};

// 회원가입
export const userJoin = async (joinData: JoinDataType) => {
  const res = await instance.post('/join', joinData);
  return res.data;
};

// Refresh만료시 토큰 재발급
export const getRefreshToken = async () => {
  const refreshToken = getCookie('refreshToken');
  const res = await instance.post(
    '/refresh',
    {},
    { headers: { 'REFRESH-TOKEN': `Bearer ${refreshToken}` } }
  );
  return res;
};
