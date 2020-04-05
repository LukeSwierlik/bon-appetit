import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';
import { Observable } from 'rxjs';
import { Directory } from '@bon-appetit/interfaces';
import { authQuery } from '../../../+state/auth/auth.selectors';
import { companyQuery } from '../../../+state/company/company.selectors';

@Component({
    selector: 'tin-sidebar-restaurant',
    templateUrl: './sidebar-restaurant.component.html'
})
export class SidebarRestaurantComponent {
    restaurantId$ = this.store.pipe(select(restaurantsQuery.getRestaurantId));
    userRole$: Observable<Directory> = this.store.pipe(select(authQuery.getUserRole));
    selectedRestaurant$: Observable<number> = this.store.pipe(select(restaurantsQuery.getSelectedRestaurant));
    companyId$: Observable<number> = this.store.pipe(select(companyQuery.getCompanyId));

    constructor(private store: Store<State>) {}
}
