import { Action, createReducer, on } from '@ngrx/store';
import { SelectedCompany, SuccessFetchCompanies } from './companies.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Company } from '@bon-appetit/interfaces';

export const companiesEntityAdapter = createEntityAdapter<Company>();

export interface CompaniesState extends EntityState<Company> {
    loaded: boolean;
    selectedCompany: number;
}

export const initialState: CompaniesState = companiesEntityAdapter.getInitialState({
    loaded: true,
    selectedCompany: 0,
});

export const reducer = createReducer(
    initialState,
    on(SuccessFetchCompanies, (state, action) => {
        return companiesEntityAdapter.addAll(action.companies, state);
    }),
    on(SelectedCompany, (state, action) => {
        return {
            ...state,
            selectedCompany: action.companyId
        }
    })
);

export function companiesReducer(state: CompaniesState | undefined, action: Action) {
    return reducer(state, action);
}
