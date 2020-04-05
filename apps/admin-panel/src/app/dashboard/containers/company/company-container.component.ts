import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { companyQuery } from '../../../+state/company/company.selectors';
import { State } from '../../../+state';
import { AlertType } from '../../../components/alert/alert.component';
import { companiesQuery } from '../../../+state/companies/companies.selectors';

@Component({
    selector: 'tin-company-container',
    templateUrl: './company-container.component.html'
})
export class CompanyContainerComponent {
    company$ = this.store.pipe(select(companiesQuery.getSelectedCompany));

    readonly AlertType = AlertType;

    constructor(private store: Store<State>) {
    }
}
