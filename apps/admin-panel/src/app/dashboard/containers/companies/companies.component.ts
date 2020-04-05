import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { Observable, Subscription } from 'rxjs';
import { Company } from '@bon-appetit/interfaces';
import { SelectedUser } from '../../../+state/users/users.actions';
import { Router } from '@angular/router';
import { LoadReservationsUser } from '../../../+state/reservations/reservations.actions';
import { AlertType } from '../../../components/alert/alert.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { companiesQuery } from '../../../+state/companies/companies.selectors';
import { SearchCompanies, SelectedCompany } from '../../../+state/companies/companies.actions';

@Component({
    selector: 'tin-companies',
    templateUrl: './companies.component.html'
})
export class CompaniesComponent implements OnInit {
    companies$: Observable<Company[]> = this.store.pipe(select(companiesQuery.getCompanies));

    companiesSearchControl = new FormControl();
    formCtrlSub: Subscription;

    readonly AlertType = AlertType;

    constructor(private store: Store<State>, private router: Router) {}

    ngOnInit() {
        this.formCtrlSub = this.companiesSearchControl.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged()
            )
            .subscribe(searchQuery => {
                this.store.dispatch(SearchCompanies({ searchQuery }));
            });
    }

    details(email: string, userId: number): void {
        this.store.dispatch(SelectedUser({ selectedUser: userId }));
        this.store.dispatch(LoadReservationsUser());

        this.router.navigate(['/users/', userId, 'details']);
    }

    showCompany(companyId: number): void {
        this.store.dispatch(SelectedCompany({ companyId }));
        this.router.navigate(['/companies', companyId, 'details']);
    }
}
