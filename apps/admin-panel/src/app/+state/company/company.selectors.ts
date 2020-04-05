import { State } from '../index';
import { createSelector } from '@ngrx/store';

const getCompanyState = (state: State) => state.company;

const getCompany = createSelector(
    getCompanyState,
    (state) => state
);

const getCompanyId = createSelector(
    getCompany,
    (company) => company.id
);

export const companyQuery = {
    getCompany,
    getCompanyId,
};
