import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';

@Component({
    selector: 'tin-home-container',
    templateUrl: './home-container.component.html',
    styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent {
    restaurants$ = this.store.pipe(select(restaurantsQuery.getFilterRestaurant));
    categories$ = this.store.pipe(select(restaurantsQuery.getCategories));

    constructor(private store: Store<State>) {
    }

}
