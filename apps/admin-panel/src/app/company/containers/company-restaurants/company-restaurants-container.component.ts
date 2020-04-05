import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { companyQuery } from '../../../+state/company/company.selectors';
import { Observable } from 'rxjs';
import { Restaurant } from '@bon-appetit/interfaces';
import { AlertType } from '../../../components/alert/alert.component';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';
import { LoadTemplates } from '../../../+state/dishes/dishes.actions';

@Component({
    selector: 'tin-company-restaurants',
    templateUrl: './company-restaurants-container.component.html'
})
export class CompanyRestaurantsContainerComponent implements OnInit {
    restaurants$: Observable<Restaurant[]> = this.store.pipe(select(restaurantsQuery.getRestaurants));
    companyId$: Observable<number> = this.store.pipe(select(companyQuery.getCompanyId));

    readonly AlertType = AlertType;

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.companyId$.subscribe(companyId => {
            if (companyId) {
                this.store.dispatch(LoadTemplates({ companyId }));
            }
        })
    }
}
