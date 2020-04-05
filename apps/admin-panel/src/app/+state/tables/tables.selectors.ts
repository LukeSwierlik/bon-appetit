import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../index';
import { tablesEntityAdapter } from './tables.reducer';

const getTablesState = (state: State) => state.tables;

const { selectAll, selectEntities, selectIds, selectTotal } = tablesEntityAdapter.getSelectors();

const getTables = createSelector(
    getTablesState,
    (state) => selectAll(state)
);

export const tablesQuery = {
    getTables,
};
