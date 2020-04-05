import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '@bon-appetit/interfaces';
import { ReservationsResources } from '@bon-appetit/resources';

@Injectable({
    providedIn: 'root'
})
export class ReservationsService {
    constructor(private httpClient: HttpClient) {}

    createReservation(createReservation: Reservation): Observable<any> {
        return this.httpClient.post(ReservationsResources.createReservation, createReservation);
    }

    loadReservationsUser(userId: number): Observable<any> {
        return this.httpClient.post(ReservationsResources.loadReservationUser, {
            userId
        })
    }

    loadReservationRestaurant(restaurantId: number): Observable<any> {
        return this.httpClient.post(ReservationsResources.loadReservationRestaurant, {
            restaurantId
        })
    }

    changeReservationStatus(reservationId: number, reservationStatus): Observable<any> {
        return this.httpClient.post(ReservationsResources.changeReservationStatus, {
            reservationId,
            reservationStatus
        })
    }
}
