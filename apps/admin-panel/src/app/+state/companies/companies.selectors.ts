import { State } from '../index';
import { createSelector } from '@ngrx/store';
import { companiesEntityAdapter } from './companies.reducer';

const getCompanyState = (state: State) => state.companies;

const { selectAll, selectEntities, selectIds, selectTotal } = companiesEntityAdapter.getSelectors();


const getCompanies = createSelector(
    getCompanyState,
    (state) => selectAll(state)
);

export const getSelectedCompanyId = createSelector(
    getCompanyState,
    (state) => state.selectedCompany
);

export const getSelectedCompany = createSelector(
    getCompanies,
    getSelectedCompanyId,
    (companies, selectedCompany) => {
        return companies.find(company => company.id === selectedCompany) || null;
    }
);


export const companiesQuery = {
    getCompanies,
    getSelectedCompanyId,
    getSelectedCompany
};
