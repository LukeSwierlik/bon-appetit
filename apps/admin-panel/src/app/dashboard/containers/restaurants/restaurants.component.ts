import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { Observable, Subscription } from 'rxjs';
import { Restaurant } from '@bon-appetit/interfaces';
import { SelectedUser } from '../../../+state/users/users.actions';
import { Router } from '@angular/router';
import { LoadReservationsUser } from '../../../+state/reservations/reservations.actions';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';
import { AlertType } from '../../../components/alert/alert.component';
import { SearchRestaurants, SelectedRestaurant } from '../../../+state/restaurants/restaurants.actions';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'tin-restaurants',
    templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {
    restaurants$: Observable<Restaurant[]> = this.store.pipe(select(restaurantsQuery.getRestaurants));

    restaurantsSearchControl = new FormControl();
    formCtrlSub: Subscription;

    readonly AlertType = AlertType;

    constructor(private store: Store<State>, private router: Router) {}

    ngOnInit() {
        this.formCtrlSub = this.restaurantsSearchControl.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged()
            )
            .subscribe(searchQuery => {
                this.store.dispatch(SearchRestaurants({ searchQuery }));
            });
    }

    details(email: string, userId: number): void {
        this.store.dispatch(SelectedUser({ selectedUser: userId }));
        this.store.dispatch(LoadReservationsUser());

        this.router.navigate(['/users/', userId, 'details']);
    }

    showRestaurant(restaurantId: number): void {
        this.store.dispatch(SelectedRestaurant({ restaurantId }));
        this.router.navigate(['/company/restaurants', restaurantId]);
    }
}
