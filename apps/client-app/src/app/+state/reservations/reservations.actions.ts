import { createReservation, fetchReservations } from './reservations.service';
import { createReservationSuccess, fetchReservationsSuccess } from './reservations.types';
import { ErrorType, Reservation } from '@bon-appetit/interfaces';
import { errorAction, resetForm, sendForm, sendFormSuccess } from '../commons/commons.types';

export const fetchReservationsAction = (userId: number) => dispatch => {
    fetchReservations(userId)
        .then(res => {
            dispatch(fetchReservationsSuccess(res.data));
        })
        .catch(e => {
            console.error('[fetchReservationsAction] error', e);
        });
};

export const createReservationAction = (reservation: Reservation) => dispatch => {
    dispatch(resetForm());
    dispatch(sendForm());

    createReservation(reservation)
        .then(res => {
            dispatch(sendFormSuccess());
        })
        .catch(e => {
            console.error('[createReservationAction] error', e);

            dispatch(errorAction({
                type: ErrorType.ERROR_CREATE_RESERVATION,
                message: 'Wystąpił bląd podczas robienia rezerwacji. Spróbuj ponownie.'
            }));
        });
};
