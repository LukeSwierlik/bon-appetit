import { Reservation } from '@bon-appetit/interfaces';

export const ReservationsActions = {
    CREATE_RESERVATION: 'Create Reservation',
    CREATE_RESERVATION_SUCCESS: 'Create Reservation Success',
    FETCH_RESERVATIONS: 'Fetch Reservations',
    FETCH_RESERVATIONS_SUCCESS: 'Fetch Reservations Success',
};

export interface CreateReservation {
    type: typeof ReservationsActions.CREATE_RESERVATION;
    reservation: Reservation;
}

export interface CreateReservationSuccess {
    type: typeof ReservationsActions.CREATE_RESERVATION_SUCCESS;
    reservation: Reservation;
}

export interface FetchReservations {
    type: typeof ReservationsActions.FETCH_RESERVATIONS;
}

export interface FetchReservationsSuccess {
    type: typeof ReservationsActions.FETCH_RESERVATIONS_SUCCESS;
    reservations: Reservation[];
}

export const createReservation = (reservation: Reservation): CreateReservation => {
  return {
      type: ReservationsActions.CREATE_RESERVATION,
      reservation
  }
};

export const createReservationSuccess = (reservation: Reservation): CreateReservationSuccess => {
    return {
        type: ReservationsActions.CREATE_RESERVATION_SUCCESS,
        reservation,
    }
};

export const fetchReservations = (): FetchReservations => {
    return {
        type: ReservationsActions.FETCH_RESERVATIONS,
    }
};

export const fetchReservationsSuccess = (reservations: Reservation[]): FetchReservationsSuccess => {
    return {
        type: ReservationsActions.FETCH_RESERVATIONS_SUCCESS,
        reservations
    }
};

export type ReservationsActionsType =
    CreateReservation |
    CreateReservationSuccess |
    FetchReservations |
    FetchReservationsSuccess;
