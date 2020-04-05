import { Reservation } from '@bon-appetit/interfaces';
import { ReservationsActions, ReservationsActionsType } from './reservations.types';
import { updateObject } from '../../utility/utility';

export interface ReservationsState {
    reservations: Reservation[];
    loaded: boolean;
}

const INITIAL_STATE: ReservationsState = {
    reservations: [],
    loaded: true,
};


const fetchReservations = (state) => {
    return updateObject(state, {
        loaded: false,
    });
};

const fetchReservationsSuccess = (state, action) => {
    return updateObject(state, {
        reservations: action.reservations,
        loaded: true,
    });
};

export const reservationsReducer = (state = INITIAL_STATE, action: ReservationsActionsType) => {
    const payload = {
        [ReservationsActions.FETCH_RESERVATIONS]: fetchReservations,
        [ReservationsActions.FETCH_RESERVATIONS_SUCCESS]: fetchReservationsSuccess,
    };

    return (payload[action.type] || (() => state))(state, action);
};
