import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, Directory, Restaurant } from '@bon-appetit/interfaces';
import { State } from '../../../+state';
import { select, Store } from '@ngrx/store';
import { authQuery } from '../../../+state/auth/auth.selectors';
import { companyQuery } from '../../../+state/company/company.selectors';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';
import { companiesQuery } from '../../../+state/companies/companies.selectors';

@Component({
    selector: 'tin-sidebar-company',
    templateUrl: './sidebar-company.component.html',
})
export class SidebarCompanyComponent {
    userRole$: Observable<Directory> = this.store.pipe(select(authQuery.getUserRole));
    companyId$: Observable<number> = this.store.pipe(select(companiesQuery.getSelectedCompanyId));
    restaurants$: Observable<Restaurant[]> = this.store.pipe(select(restaurantsQuery.getRestaurants));

    constructor(private store: Store<State>) {}
}
