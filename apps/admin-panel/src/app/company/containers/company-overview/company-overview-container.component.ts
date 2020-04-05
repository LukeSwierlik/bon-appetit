import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { companyQuery } from '../../../+state/company/company.selectors';
import { State } from '../../../+state';
import { AlertType } from '../../../components/alert/alert.component';

@Component({
    selector: 'tin-company-overview-container',
    templateUrl: './company-overview-container.component.html'
})
export class CompanyOverviewContainerComponent {
    company$ = this.store.pipe(select(companyQuery.getCompany));

    readonly AlertType = AlertType;

    constructor(private store: Store<State>) {
    }
}
