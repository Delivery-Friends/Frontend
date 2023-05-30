import ActionTypes from './ActionTypes';

const AuthReducer = (
  state: any,
  action: { type: string; payload?: { accessToken: string } }
) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        accessToken: action.payload?.accessToken,
      };
    case ActionTypes.LOGOUT:
      return { accessToken: null };
    default:
      return state;
  }
};

export default AuthReducer;
