import { RESERVATIONS_API } from './api';

export const ReservationsResources = {
    createReservation: `${RESERVATIONS_API}/create`,
    loadReservationUser: `${RESERVATIONS_API}/users`,
    loadReservationRestaurant: `${RESERVATIONS_API}/restaurant`,
    changeReservationStatus: `${RESERVATIONS_API}/change-status`,
};
