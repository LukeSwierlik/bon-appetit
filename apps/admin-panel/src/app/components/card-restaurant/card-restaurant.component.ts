import { Component, Input } from '@angular/core';
import { Restaurant } from '@bon-appetit/interfaces';
import { State } from '../../+state';
import { Store } from '@ngrx/store';
import { SelectedRestaurant } from '../../+state/restaurants/restaurants.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'tin-card-restaurant',
    templateUrl: './card-restaurant.component.html',
})
export class CardRestaurant {
    @Input() restaurant: Restaurant;


    constructor(private store: Store<State>,
                private router: Router) {
    }

    selectRestaurant(restaurantId: number): void {
        this.store.dispatch(SelectedRestaurant({ restaurantId }));

        this.router.navigate(['/company/restaurants', restaurantId]);
    }

}
