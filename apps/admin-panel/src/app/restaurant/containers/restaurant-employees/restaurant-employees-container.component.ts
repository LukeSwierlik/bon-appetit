import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { AlertType } from '../../../components/alert/alert.component';
import { employeesQuery } from '../../../+state/employees/employees.selectors';
import { Employee } from '@bon-appetit/interfaces';
import { LoadEmployees } from '../../../+state/employees/employees.actions';

@Component({
    selector: 'tin-restaurant-employees-container',
    templateUrl: './restaurant-employees-container.component.html'
})
export class RestaurantEmployeesContainerComponent implements OnInit {
    employees$: Observable<Employee[]> = this.store.pipe(select(employeesQuery.getEmployees));

    readonly AlertType = AlertType;

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.store.dispatch(LoadEmployees());
    }
}
