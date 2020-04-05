import { createAction, props } from '@ngrx/store';
import { User } from '@bon-appetit/interfaces';
import { FormLoginUser, FormRegisterUser } from './auth.interfaces';

export const CreateUser = createAction('[Auth] Register User', props<{ form: FormRegisterUser }>());
export const LoginUser = createAction('[Auth] LoginAction User', props<{ form: FormLoginUser }>());
export const SuccessLogin = createAction('[Auth] Success LoginAction', props<{ user: User }>());
export const ErrorLogin = createAction('[Auth] ERROR LoginAction');

export const Logout = createAction('[Auth] LogoutAction');
