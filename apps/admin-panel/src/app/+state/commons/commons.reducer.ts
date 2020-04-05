import { Action, createReducer, on } from '@ngrx/store';
import { ErrorAction, ErrorForm, ResetForm, SendForm, SuccessForm } from './commons.actions';
import { CustomError } from '@bon-appetit/interfaces';

export interface CommonsState {
    success: boolean;
    error: boolean;
    message: string;
    loaded: boolean;
    sendForm: boolean;
    customError: CustomError | null;
}

export const initialState: CommonsState = {
    success: false,
    error: false,
    message: '',
    loaded: true,
    sendForm: false,
    customError: null
};

export const reducer = createReducer(
    initialState,
    on(SendForm, state => {
        return {
            ...state,
            loaded: false
        };
    }),
    on(SuccessForm, state => {
        return {
            ...state,
            success: true,
            loaded: true,
            sendForm: true
        };
    }),
    on(ErrorForm, (state, action) => {
        return {
            ...state,
            error: true,
            loaded: true,
            sendForm: true,
            message: action.message
        };
    }),
    on(ResetForm, (state, action) => {
        return {
            ...state,
            success: false,
            error: false,
            message: '',
            sendForm: false,
            loaded: true
        };
    }),
    on(ErrorAction, (state, { error }) => {
        return {
            ...state,
            customError: error,
        }
    })
);

export function commonsReducer(state: CommonsState | undefined, action: Action) {
    return reducer(state, action);
}
