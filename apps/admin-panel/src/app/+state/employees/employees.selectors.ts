import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../index';
import { employeesEntityAdapter } from './employees.reducer';

const getEmployeesState = (state: State) => state.employees;

const { selectAll, selectEntities, selectIds, selectTotal } = employeesEntityAdapter.getSelectors();

const getEmployees = createSelector(
    getEmployeesState,
    (state) => selectAll(state)
);

export const employeesQuery = {
    getEmployees
};
