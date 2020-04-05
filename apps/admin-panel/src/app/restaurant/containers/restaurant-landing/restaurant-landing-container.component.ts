import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { Restaurant } from '@bon-appetit/interfaces';
import { Observable } from 'rxjs';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';

@Component({
    selector: 'tin-restaurant-landing',
    templateUrl: './restaurant-landing-container.component.html'
})
export class RestaurantLandingContainerComponent {
    restaurant$: Observable<Restaurant> = this.store.pipe(select(restaurantsQuery.getRestaurant));

    constructor(private store: Store<State>) {
    }
}
