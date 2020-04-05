import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Table } from '@bon-appetit/interfaces';
import { LoadTables, SuccessCreateTable, SuccessLoadTables } from './tables.actions';

export const tablesEntityAdapter = createEntityAdapter<Table>();

export interface TablesState extends EntityState<Table> {
    loaded: boolean;
}

export const initialState: TablesState = tablesEntityAdapter.getInitialState({
    loaded: true
});

const reducer = createReducer(
    initialState,
    on(LoadTables, (state) => {
        return {
            ...state,
            loaded: false,
        }
    }),
    on(SuccessCreateTable, (state, { table }) => {
        return tablesEntityAdapter.addOne(table, state);
    }),
    on(SuccessLoadTables, (state, { tables }) => {
        return tablesEntityAdapter.addAll(tables, {
            ...state,
            loaded: true,
        });
    })
);

export function tablesReducer(state: TablesState | undefined, action: Action) {
    return reducer(state, action);
}
