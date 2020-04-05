import { login, loginError, loginSuccess, logout, registerError, registerSuccess } from './auth.types';
import { loginUser, registerUser } from './auth.service';
import { historyRouter } from '../../router/history';
import { errorAction, resetForm, sendForm, sendFormSuccess } from '../commons/commons.types';
import { ErrorType } from '@bon-appetit/interfaces';

export const loginAction = (email: string, password: string) => (dispatch): void => {
  dispatch(login());

  loginUser({ email, password })
      .then((res) => {
          localStorage.setItem('auth_token', res.data.email);
          historyRouter.push('/');

          dispatch(loginSuccess(res.data));
      })
      .catch((e) => {
          console.error('[loginAction] error', e);
          dispatch(loginError());
      });
};

export const logoutAction = () => (dispatch) => {
    localStorage.removeItem('auth_token');
    historyRouter.push('/');

    dispatch(logout());
};

export const checkLoginAction = () => (dispatch): void => {
    const authToken = localStorage.getItem('auth_token');

    if (authToken) {
        dispatch(loginAction(authToken, 'admin'));
    }
};

export const registerAction = (create: any) => (dispatch): void => {
    dispatch(resetForm());
    dispatch(sendForm());

    registerUser(create)
        .then(() => {
            dispatch(registerSuccess());
            dispatch(sendFormSuccess());
        })
        .catch(e => {
            dispatch(registerError());
            dispatch(errorAction({
                type: ErrorType.ERROR_CREATE_USER,
                message: 'Wystąpił bląd podczas tworzenia użytkownika.'
            }));
        });
};
