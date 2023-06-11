import { createContext, useMemo, useReducer } from 'react';
import ActionTypes from './ActionTypes';
import AuthReducer from './AuthReducer';

interface AuthContext {
  accessToken?: string;
  login: (accessToken: string) => void;
  logout: () => void;
}

const authContext = createContext<AuthContext>({
  accessToken: undefined,
  login: (accessToken: string) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, authDispatch] = useReducer(AuthReducer, undefined);

  const value: AuthContext = useMemo(
    () => ({
      accessToken,
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
    [accessToken]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export { AuthContextProvider, authContext };
