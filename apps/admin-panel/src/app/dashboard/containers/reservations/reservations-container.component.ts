import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { Observable } from 'rxjs';
import { Reservation } from '@bon-appetit/interfaces';
import { reservationsQuery } from '../../../+state/reservations/reservations.selectors';
import { LoadReservationsUser } from '../../../+state/reservations/reservations.actions';

@Component({
    selector: 'tin-reservations-container',
    templateUrl: './reservations-container.component.html'
})
export class ReservationsContainerComponent implements OnInit {
    reservations$: Observable<Reservation[]> = this.store.pipe(select(reservationsQuery.getReservations));

    constructor(private store: Store<State>) {}

    ngOnInit() {
        this.store.dispatch(LoadReservationsUser());
    }
}
