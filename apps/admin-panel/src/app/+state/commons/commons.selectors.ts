import { State } from '../index';
import { createSelector } from '@ngrx/store';

const getFormState = (state: State) => state.commons;

const getForm = createSelector(
    getFormState,
    (state) => state
);

export const formQuery = {
    getForm
};
