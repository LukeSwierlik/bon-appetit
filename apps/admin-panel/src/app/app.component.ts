import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { authQuery } from './+state/auth/auth.selectors';
import { State } from './+state';
import { LoginUser } from './+state/auth/auth.actions';
import { FetchOrdersUser } from './+state/orders/orders.actions';
import { LoadCategories, LoadRestaurants } from './+state/restaurants/restaurants.actions';
import { LoadUsers } from './+state/users/users.actions';
import { FetchCompanies } from './+state/companies/companies.actions';

@Component({
    selector: 'tin-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    roleUser$ = this.store.pipe(select(authQuery.getUserRole));
    constructor(private store: Store<State>) {}

    ngOnInit(): void {
        this.store.dispatch(LoadRestaurants());
        this.store.dispatch(FetchCompanies());

        this.store.dispatch(FetchOrdersUser());

        this.store.dispatch(LoadCategories());
        this.checkLogin();
        this.store.dispatch(LoadUsers());
    }

    private checkLogin(): void {
        const email = localStorage.getItem('auth_token');

        if (email) {
            this.store.dispatch(LoginUser({
                form: {
                    email
                }
            }));
        }
    }
}
