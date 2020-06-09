import { CustomError } from '@bon-appetit/interfaces';
import { updateObject } from '../../utility/utility';
import { CommonsActions, CommonsActionType } from './commons.types';

export interface CommonsState {
    success: boolean;
    error: boolean;
    message: string;
    loaded: boolean;
    sendForm: boolean;
    customError: CustomError | null;
}

const INITIAL_STATE: CommonsState = {
    success: false,
    error: false,
    message: '',
    loaded: true,
    sendForm: false,
    customError: null
};

const sendForm = (state, action) => {
    return updateObject(state, {
        loaded: false,
    });
};

const sendFormSuccess = (state, action) => {
    return updateObject(state, {
        success: true,
        loaded: true,
        sendForm: true,
    });
};

const sendFormError = (state, { message }) => {
    return updateObject(state, {
        error: true,
        loaded: true,
        sendForm: true,
        message,
    });
};

const resetForm = (state, action) => {
   return updateObject(state, INITIAL_STATE);
};

const errorAction = (state, { error }) => {
    return updateObject(state, {
        customError: error,
    });
};

export const commonsReducer = (state = INITIAL_STATE, action: CommonsActionType) => {
    const payload = {
        [CommonsActions.SEND_FORM]: sendForm,
        [CommonsActions.SEND_FORM_SUCCESS]: sendFormSuccess,
        [CommonsActions.SEND_FORM_ERROR]: sendFormError,
        [CommonsActions.RESET_FORM]: resetForm,
        [CommonsActions.ERROR_ACTION]: errorAction,
    };

    return (payload[action.type] || (() => state))(state, action);
};
