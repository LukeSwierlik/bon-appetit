import { User } from '@bon-appetit/interfaces';

export const AuthActions = {
    LOGIN: 'Login',
    LOGIN_SUCCESS: 'Login Success',
    LOGIN_ERROR: 'Login Error',
    LOGOUT: 'Logout',
    CHECK_LOGIN: 'Check Login',
    REGISTER: 'Register',
    REGISTER_SUCCESS: 'Register Success',
    REGISTER_ERROR: 'Register Error',
};

export interface LoginAction {
    type: typeof AuthActions.LOGIN;
}

export interface LogoutAction {
    type: typeof AuthActions.LOGOUT;
}

export interface LoginSuccessAction {
    type: typeof AuthActions.LOGIN_SUCCESS;
    user: User;
}

export interface LoginErrorAction {
    type: typeof AuthActions.LOGIN_ERROR;
}

export interface CheckLoginAction {
    type: typeof AuthActions.CHECK_LOGIN;
}

export interface Register {
    type: typeof AuthActions.REGISTER;
}

export interface RegisterSuccess {
    type: typeof AuthActions.REGISTER_SUCCESS;
}

export interface RegisterError {
    type: typeof AuthActions.REGISTER_ERROR;
}

export const login = (): LoginAction => {
    return {
        type: AuthActions.LOGIN,
    }
};

export const logout = (): LogoutAction => {
    return {
        type: AuthActions.LOGOUT
    }
};

export const loginSuccess = (user: User): LoginSuccessAction => {
    return {
        type: AuthActions.LOGIN_SUCCESS,
        user
    }
};

export const loginError = (): LoginErrorAction => {
    return {
        type: AuthActions.LOGIN_ERROR
    }
};

export const registerSuccess = (): RegisterSuccess => {
    return {
        type: AuthActions.REGISTER_SUCCESS,
    }
};

export const registerError = (): RegisterSuccess => {
    return {
        type: AuthActions.REGISTER_ERROR,
    }
};

export type AuthActionType =
    LoginAction |
    LoginSuccessAction |
    LoginErrorAction |
    LogoutAction |
    CheckLoginAction;
