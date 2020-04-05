import axios from 'axios';
import { Reservation } from '@bon-appetit/interfaces';
import { ReservationsResources } from '@bon-appetit/resources';

export const createReservation = (reservation: Reservation) => axios.post(ReservationsResources.createReservation, reservation);

export const fetchReservations = (userId: number) => axios.post(ReservationsResources.loadReservationUser, {
    userId
});
