import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Reservation } from '@bon-appetit/interfaces';
import {
    ChangeReservationStatusSuccess,
    LoadReservationsRestaurant,
    LoadReservationsSuccess, LoadReservationsUser,
    SuccessCreateReservation
} from './reservations.actions';

export const reservationsEntityAdapter = createEntityAdapter<Reservation>();

export interface ReservationsState extends EntityState<Reservation> {
    loaded: boolean;
}

export const initialState: ReservationsState = reservationsEntityAdapter.getInitialState({
    loaded: true
});

const reducer = createReducer(
    initialState,
    on(LoadReservationsRestaurant, LoadReservationsUser, state => {
        return {
            ...state,
            loaded: false
        };
    }),
    on(LoadReservationsSuccess, (state, action) => {
        return reservationsEntityAdapter.addAll(action.reservations, {
            ...state,
            loaded: true,
        })
    }),
    on(SuccessCreateReservation, (state, action) => {
        return reservationsEntityAdapter.addOne(action.reservation, state);
    }),
    on(ChangeReservationStatusSuccess, (state, { update}) => {
        return reservationsEntityAdapter.updateOne(update, state);
    })
);

export function reservationsReducer(state: ReservationsState | undefined, action: Action) {
    return reducer(state, action);
}
