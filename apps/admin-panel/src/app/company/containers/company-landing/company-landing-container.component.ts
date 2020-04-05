import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { FetchCompany } from '../../../+state/company/company.actions';
import { Observable } from 'rxjs';
import { authQuery } from '../../../+state/auth/auth.selectors';
import { LoadCompanyRestaurants } from '../../../+state/restaurants/restaurants.actions';
import { companyQuery } from '../../../+state/company/company.selectors';
import { take } from 'rxjs/operators';
import { CompanyState } from '../../../+state/company/company.reducer';

@Component({
    selector: 'tin-company',
    templateUrl: './company-landing-container.component.html'
})
export class CompanyLandingContainerComponent implements OnInit {
    userId$: Observable<number> = this.store.pipe(select(authQuery.getUserId));
    company$ = this.store.pipe(select(companyQuery.getCompany));

    company: CompanyState;

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.userId$.subscribe(ownerId => {
            this.store.dispatch(FetchCompany({ ownerId }));
            this.store.dispatch(LoadCompanyRestaurants());
        });

        this.company$.pipe(take(1)).subscribe(company => {
            this.company = company;
        })
    }

    getTitle(company: CompanyState): string {
        return company.id ? `Panel firmowy: ${company.name}` : 'Panel firmowy';
    }
}
