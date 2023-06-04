import { createContext, useEffect, useMemo, useReducer } from 'react';
import ActionTypes from './ActionTypes';
import AuthReducer from './AuthReducer';

import { getRefreshToken } from '../../api/kakaoLogin';

interface AuthContext {
  auth: {
    accessToken?: string;
  };
  login: (accessToken: string) => void;
  logout: () => void;
}

const authContext = createContext<AuthContext>({
  auth: {
    accessToken: undefined,
  },
  login: (accessToken: string) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, authDispatch] = useReducer(AuthReducer, {
    accessToken: undefined,
  });

  useEffect(() => {
    const initAuth = async () => {
      const { data } = await getRefreshToken();
      if (data.message === '요청에 성공하였습니다.') {
        if (data.payload) {
          authDispatch({
            type: ActionTypes.LOGIN,
            payload: { accessToken: data.payload.accessToken },
          });
        } else {
          // console.log('refresh토큰을 통해서 accessToken을 가져올 수 없습니다.');
          // console.log('다시 로그인하는 로직으로 설정');
          return undefined;
        }
      }
    };
    initAuth();
  }, []);

  const value: AuthContext = useMemo(
    () => ({
      auth,
      login: accessToken => {
        authDispatch({
          type: ActionTypes.LOGIN,
          payload: { accessToken },
        });
      },
      logout: () => {
        authDispatch({ type: ActionTypes.LOGOUT });
      },
    }),
    [auth]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export { AuthContextProvider, authContext };
