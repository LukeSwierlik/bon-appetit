import { Action, createReducer, on } from '@ngrx/store';
import { SuccessCreateCompany, SuccessFetchCompany } from './company.actions';

export interface CompanyState {
    street: string;
    city: string;
    numberOfBuilding: string;
    postalCode: string;
    country: string;
    created?: string,
    updated?: string | null,
    id: number;
    name: string;
    email: string;
    logoUrl: string;
    timeReservation: number;
    phoneNumber: string;
}

export const initialState: CompanyState = {
    id: 0,
    name: '',
    city: '',
    numberOfBuilding: '',
    postalCode: '',
    country: '',
    created: '',
    email: '',
    logoUrl: '',
    street: '',
    timeReservation: 0,
    updated: '',
    phoneNumber: '',
};

export const reducer = createReducer(
    initialState,
    on(SuccessFetchCompany, (state, action) => {
        return {
            ...state,
            ...action.company,
        };
    }),
    on(SuccessCreateCompany, (state, action) => {
        return {
            ...state,
            ...action.company,
        }
    })
);

export function companyReducer(state: CompanyState | undefined, action: Action) {
    return reducer(state, action);
}
