import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { AllEmployees } from '@bon-appetit/interfaces';
import { CreateEmployeeSuccess, LoadEmployees, LoadEmployeesSuccess } from './employees.actions';

export const employeesEntityAdapter = createEntityAdapter<AllEmployees>();

export interface EmployeesState extends EntityState<AllEmployees> {
    loaded: boolean;
}

export const initialState: EmployeesState = employeesEntityAdapter.getInitialState({
    loaded: true
});

const reducer = createReducer(
    initialState,
    on(LoadEmployees, state => {
        return {
            ...state,
            loaded: false
        };
    }),
    on(LoadEmployeesSuccess, (state, action) => {
        return employeesEntityAdapter.addAll(action.employees, {
            ...state,
            loaded: true
        });
    }),
    on(CreateEmployeeSuccess, (state, action) => {
        return employeesEntityAdapter.addOne(action.employee, state);
    })
);

export function employeesReducer(state: EmployeesState | undefined, action: Action) {
    return reducer(state, action);
}
