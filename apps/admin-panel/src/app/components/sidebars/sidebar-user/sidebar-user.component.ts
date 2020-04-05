import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { authQuery } from '../../../+state/auth/auth.selectors';
import { Observable } from 'rxjs';
import { User } from '@bon-appetit/interfaces';
import { Router } from '@angular/router';
import { SelectedRestaurant } from '../../../+state/restaurants/restaurants.actions';

@Component({
    selector: 'tin-sidebar-user',
    templateUrl: './sidebar-user.component.html'
})
export class SidebarUserComponent {
    userId$ = this.store.pipe(select(authQuery.getUserId));
    user$: Observable<User> = this.store.pipe(select(authQuery.getUserInfo));

    constructor(private store: Store<State>,
                private router: Router) {}

    selectRestaurant(restaurantId: number): void {
        this.store.dispatch(SelectedRestaurant({ restaurantId }));
        this.router.navigate(['/company/restaurants', restaurantId]);
    }

    selectCompany(companyId: number): void {

    }
}
