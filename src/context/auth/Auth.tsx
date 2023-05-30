import { createContext, useMemo, useReducer } from 'react';
import ActionTypes from './ActionTypes';
import AuthReducer from './AuthReducer';

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
