import { CustomError } from '@bon-appetit/interfaces';

export const CommonsActions = {
    SEND_FORM: 'Send Form',
    SEND_FORM_SUCCESS: 'Send Form Success',
    SEND_FORM_ERROR: 'Send Form Error',
    RESET_FORM: 'Reset Form',
    ERROR_ACTION: 'Error Action',
};

export interface SendFormAction {
    type: typeof CommonsActions.SEND_FORM;
}

export interface SendFormSuccessAction {
    type: typeof CommonsActions.SEND_FORM_ERROR;
}

export interface SendFormErrorAction {
    type: typeof CommonsActions.SEND_FORM_ERROR;
    message: string;
}

export interface ResetFormAction {
    type: typeof CommonsActions.RESET_FORM;
}

export interface ErrorAction {
    type: typeof CommonsActions.ERROR_ACTION;
    error: CustomError;
}

export const sendForm = (): SendFormAction => {
    return {
        type: CommonsActions.SEND_FORM,
    }
};

export const sendFormSuccess = (): SendFormSuccessAction => {
    return {
        type: CommonsActions.SEND_FORM_SUCCESS,
    }
};

export const sendFormError = (message: string): SendFormErrorAction => {
    return {
        type: CommonsActions.SEND_FORM_ERROR,
        message
    }
};

export const resetForm = (): ResetFormAction => {
    return {
        type: CommonsActions.RESET_FORM,
    }
};

export const errorAction = (error: CustomError): ErrorAction => {
    return {
        type: CommonsActions.ERROR_ACTION,
        error
    }
};

export type CommonsActionType =
    SendFormAction |
    SendFormSuccessAction |
    SendFormErrorAction |
    ResetFormAction |
    ErrorAction;
