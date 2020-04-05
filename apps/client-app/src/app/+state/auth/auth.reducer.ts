import { User } from '@bon-appetit/interfaces';
import { updateObject } from '../../utility/utility';
import { AuthActions, AuthActionType } from './auth.types';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: boolean;
    isRegistered: boolean;
}

const INITIAL_STATE: AuthState = {
    isAuthenticated: false,
    user: null,
    error: false,
    isRegistered: false,
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        isAuthenticated: true
    });
};

const loginError = (state) => {
    return updateObject(state, {
        error: true,
    });
};

const logout = (state) => {
    return updateObject(state, {
        ...INITIAL_STATE
    });
};

export const authReducer = (state = INITIAL_STATE, action: AuthActionType) => {
  const payload = {
      [AuthActions.LOGIN_SUCCESS]: loginSuccess,
      [AuthActions.LOGIN_ERROR]: loginError,
      [AuthActions.LOGOUT]: logout
  };

  return (payload[action.type] || (() => state))(state, action);
};
