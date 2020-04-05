import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { Company, User } from '@bon-appetit/interfaces';
import { Observable } from 'rxjs';
import { authQuery } from '../../../+state/auth/auth.selectors';
import { companiesQuery } from '../../../+state/companies/companies.selectors';
import { LoadCompanyRestaurants } from '../../../+state/restaurants/restaurants.actions';
import { SuccessFetchCompany } from '../../../+state/company/company.actions';

@Component({
    selector: 'tin-company-details',
    templateUrl: './company-details.component.html'
})
export class CompanyDetailsComponent implements OnInit {
    company$ = this.store.pipe(select(companiesQuery.getSelectedCompany));

    selectedCompanies$: Observable<Company> = this.store.pipe(select(companiesQuery.getSelectedCompany));

    constructor(private store: Store<State>) {

    }

    ngOnInit(): void {
        this.store.dispatch(LoadCompanyRestaurants());

        this.selectedCompanies$.subscribe(company => {
            this.store.dispatch(SuccessFetchCompany({ company }));
        })
    }
}
