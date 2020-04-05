import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../index';
import { reservationsEntityAdapter } from './reservations.reducer';

const getReservationsState = (state: State) => state.reservations;

const { selectAll, selectEntities, selectIds, selectTotal } = reservationsEntityAdapter.getSelectors();

const getReservations = createSelector(
    getReservationsState,
    (state) => selectAll(state)
);

export const reservationsQuery = {
    getReservations
};
