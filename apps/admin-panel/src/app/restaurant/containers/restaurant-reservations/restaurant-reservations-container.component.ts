import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Reservation, ReservationStatus, User } from '@bon-appetit/interfaces';
import { reservationsQuery } from '../../../+state/reservations/reservations.selectors';
import { State } from '../../../+state';
import { ChangeReservationStatus, LoadReservationsRestaurant } from '../../../+state/reservations/reservations.actions';
import { SelectedUser } from '../../../+state/users/users.actions';
import { Router } from '@angular/router';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';
import { AlertType } from '../../../components/alert/alert.component';
import { authQuery } from '../../../+state/auth/auth.selectors';

@Component({
    selector: 'tin-restaurant-reservations-container',
    templateUrl: './restaurant-reservations-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantReservationsContainerComponent implements OnInit {
    reservations$: Observable<Reservation[]> = this.store.pipe(select(reservationsQuery.getReservations));
    restaurantId$: Observable<number> = this.store.pipe(select(restaurantsQuery.getRestaurantId));
    user$: Observable<User> = this.store.pipe(select(authQuery.getUserInfo));

    readonly AlertType = AlertType;

    constructor(private store: Store<State>,
                private router: Router) {}

    ngOnInit() {
        this.store.dispatch(LoadReservationsRestaurant());
    }

    showUser(selectedUser: number) {
        this.store.dispatch(SelectedUser({ selectedUser }));

        this.router.navigate(['/users', selectedUser, 'details']);
    }

    getClassReservationStatus(status: ReservationStatus): string {
        switch (status) {
            case ReservationStatus.PRZYJETO: {
                return 'badge-success';
            }
            case ReservationStatus.ANULOWANO: {
                return 'badge-danger';
            }
            case ReservationStatus.ZAKONCZONO: {
                return 'badge-secondary'
            }
        }
    }

    reservationStatuses(): ReservationStatus[] {
        return [ReservationStatus.PRZYJETO, ReservationStatus.ANULOWANO, ReservationStatus.ZAKONCZONO];
    }

    changeStatus(reservationId: number, event: any): void {
        const reservationStatus = event.target.value;

        this.store.dispatch(ChangeReservationStatus({
            reservationId,
            reservationStatus
        }));
    }
}
