import { User } from '@bon-appetit/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import { ErrorLogin, Logout, SuccessLogin } from './auth.actions';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: boolean;
    isRegistered: boolean;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: false,
    isRegistered: false,
};

export const reducer = createReducer(
    initialState,
    on(SuccessLogin, (state, action) => {
        return {
            ...state,
            user: action.user,
            isAuthenticated: true
        }
    }),
    on(ErrorLogin, (state) => {
        return {
            ...state,
            error: true
        }
    }),
    on(Logout, (state) => {
        return initialState;
    })
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return reducer(state, action);
}
