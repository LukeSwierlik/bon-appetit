import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { Observable } from 'rxjs';
import { Restaurant } from '@bon-appetit/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { RemoveRestaurant, SelectedRestaurant } from '../../../+state/restaurants/restaurants.actions';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';
import { LoadDishes } from '../../../+state/dishes/dishes.actions';
import { companiesQuery } from '../../../+state/companies/companies.selectors';

@Component({
    selector: 'tin-restaurant-details-container',
    templateUrl: './restaurant-details-container.component.html',
})
export class RestaurantDetailsContainerComponent implements OnInit {
    restaurant$: Observable<Restaurant> = this.store.pipe(select(restaurantsQuery.getRestaurant));
    selectedCompaniesId$: Observable<number> = this.store.pipe(select(companiesQuery.getSelectedCompanyId));

    constructor(private store: Store<State>, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.store.dispatch(SelectedRestaurant({ restaurantId: parseInt(params.id, 10) }));
            this.store.dispatch(LoadDishes());
        });
    }

    removeRestaurant(restaurantId: number): void {
        this.store.dispatch(RemoveRestaurant({ restaurantId }));
    }
}
