import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { State } from '../index';
import { ReservationsService } from './reservations.service';
import { LoadRestaurants, SuccessLoadRestaurants } from '../restaurants/restaurants.actions';
import { catchError, first, map, switchMap, take } from 'rxjs/operators';
import { AllEmployees, ErrorType, Reservation, Restaurant } from '@bon-appetit/interfaces';
import { combineLatest, from, Observable, of } from 'rxjs';
import { ErrorAction, SuccessForm } from '../commons/commons.actions';
import { restaurantsQuery } from '../restaurants/restaurants.selectors';
import {
    ChangeReservationStatus, ChangeReservationStatusSuccess,
    CreateReservation,
    LoadReservationsRestaurant,
    LoadReservationsSuccess,
    LoadReservationsUser,
    SuccessCreateReservation
} from './reservations.actions';
import { authQuery } from '../auth/auth.selectors';

@Injectable()
export class ReservationsEffects {
    restaurantId$: Observable<number> = this.store.pipe(
        select(restaurantsQuery.getRestaurantId),
        first<number>(Boolean)
    );

    userId$: Observable<number> = this.store.pipe(
        select(authQuery.getUserId),
        first<number>(Boolean)
    );

    constructor(private actions$: Actions, private store: Store<State>, private reservationsService: ReservationsService) {}

    loadReservationRestaurant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadReservationsRestaurant),
            switchMap(() => {
                return combineLatest([this.restaurantId$]).pipe(
                    switchMap(([restaurantId]) => {
                        return this.reservationsService.loadReservationRestaurant(restaurantId).pipe(
                            map((reservations: Reservation[]) => {
                                const updateReservations = reservations.map(reservation => {
                                    return {
                                        ...reservation,
                                        date: reservation.date
                                    };
                                });

                                return updateReservations;
                            }),
                            map((reservations: Reservation[]) => {
                                return LoadReservationsSuccess({ reservations });
                            }),
                            catchError(() => {
                                return of(
                                    ErrorAction({
                                        error: {
                                            type: ErrorType.ERROR_LOAD_RESERVATIONS,
                                            message: 'Wystąpił bląd podczas pobierania rezerwacji.'
                                        }
                                    })
                                );
                            })
                        );
                    })
                );
            })
        )
    );

    loadReservationUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadReservationsUser),
            switchMap(() => {
                return combineLatest([this.userId$]).pipe(
                    switchMap(([userId]) => {
                        return this.reservationsService.loadReservationsUser(userId).pipe(
                            map((reservations: Reservation[]) => {
                                return LoadReservationsSuccess({ reservations });
                            }),
                            catchError(() => {
                                return of(
                                    ErrorAction({
                                        error: {
                                            type: ErrorType.ERROR_LOAD_RESERVATIONS,
                                            message: 'Wystąpił bląd podczas pobierania rezerwacji.'
                                        }
                                    })
                                );
                            })
                        );
                    })
                );
            })
        )
    );


    createReservation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CreateReservation),
            switchMap(action => {
                return combineLatest([
                    this.userId$,
                    this.restaurantId$
                ]).pipe(
                    take(1),
                    switchMap(([userId, restaurantId]) => {
                        return this.reservationsService
                            .createReservation({
                                ...action.createReservation,
                                restaurantId,
                                userId
                            })
                            .pipe(
                                switchMap((reservation: Reservation) => {
                                    return from([
                                        SuccessCreateReservation({ reservation }),
                                        SuccessForm()
                                    ]);
                                }),
                                catchError(() => {
                                    return of(
                                        ErrorAction({
                                            error: {
                                                type: ErrorType.ERROR_LOAD_RESERVATIONS,
                                                message: 'Wystąpił bląd podczas tworzenia rezerwacji.'
                                            }
                                        })
                                    );
                                })
                            );
                    })
                );
            })
        )
    );

    changeReservationStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChangeReservationStatus),
            switchMap(({ reservationId, reservationStatus }) => {
                return this.reservationsService.changeReservationStatus(reservationId, reservationStatus).pipe(
                    map(() => {
                        const update = {
                            id: reservationId,
                            changes: {
                                status: reservationStatus
                            }
                        };

                        return ChangeReservationStatusSuccess({ update });
                    })
                )
            })
        )
    )
}
