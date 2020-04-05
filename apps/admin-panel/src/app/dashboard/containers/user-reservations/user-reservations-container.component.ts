import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Reservation, ReservationStatus } from '@bon-appetit/interfaces';
import { reservationsQuery } from '../../../+state/reservations/reservations.selectors';
import { State } from '../../../+state';
import { LoadReservationsRestaurant, LoadReservationsUser } from '../../../+state/reservations/reservations.actions';
import { ViewFetchOrdersUser } from '../../../+state/viewOrders/viewOrders.actions';
import { SelectedRestaurant } from '../../../+state/restaurants/restaurants.actions';
import { Router } from '@angular/router';
import { AlertType } from '../../../components/alert/alert.component';

@Component({
    selector: 'tin-user-reservations-container',
    templateUrl: './user-reservations-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserReservationsContainerComponent implements OnInit {
    reservations$: Observable<Reservation[]> = this.store.pipe(select(reservationsQuery.getReservations));

    readonly AlertType = AlertType;

    constructor(private store: Store<State>,
                private router: Router) {}

    ngOnInit() {
        this.store.dispatch(LoadReservationsUser());
    }

    showRestaurant(restaurantId: number): void {
        this.store.dispatch(SelectedRestaurant({ restaurantId }));

        this.router.navigate(['/company/restaurants', restaurantId]);
    }

    getDate(date: Date): string {
        return new Date(date).toLocaleDateString();
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
}
