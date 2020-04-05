import { createAction, props } from '@ngrx/store';
import { Reservation, ReservationStatus, UpdateEntity } from '@bon-appetit/interfaces';

export const CreateReservation = createAction('[Reservation] Create reservation', props<{ createReservation: Reservation }>());
export const SuccessCreateReservation = createAction('[Reservation] Success Create reservation', props<{ reservation: Reservation }>());

export const LoadReservationsUser = createAction('[Reservations] Load Reservations User');
export const LoadReservationsRestaurant = createAction('[Reservations] Load Reservations Restaurant');
export const LoadReservationsSuccess = createAction('[Reservations] Load Reservations Success', props<{ reservations: Reservation[] }>());

export const ChangeReservationStatus = createAction('[Reservations] Change Reservation Status', props<{ reservationId: number, reservationStatus: ReservationStatus }>());
export const ChangeReservationStatusSuccess = createAction('[Reservations] Change Reservation Status Success', props<{ update: UpdateEntity<Reservation> }>());

