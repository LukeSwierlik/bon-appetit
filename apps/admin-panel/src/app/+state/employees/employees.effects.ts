import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { combineLatest, from, Observable, of } from 'rxjs';
import { CreateEmployee, CreateEmployeeSuccess, LoadEmployees, LoadEmployeesSuccess } from './employees.actions';
import { EmployeesService } from './employees.service';
import { ErrorAction, SuccessForm } from '../commons/commons.actions';
import { AllEmployees, ErrorType } from '@bon-appetit/interfaces';
import { select, Store } from '@ngrx/store';
import { State } from '../index';
import { restaurantsQuery } from '../restaurants/restaurants.selectors';

@Injectable()
export class EmployeesEffects {
    restaurantId$: Observable<number> = this.store.pipe(
        select(restaurantsQuery.getRestaurantId),
        first<number>(Boolean)
    );

    constructor(private actions$: Actions,
                private employeesService: EmployeesService,
                private store: Store<State>) {}

    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadEmployees),
            switchMap(() => {
                return combineLatest([
                    this.restaurantId$
                ]).pipe(
                    switchMap(([restaurantId]) => {
                        return this.employeesService.loadEmployees(restaurantId).pipe(
                            map((employees: AllEmployees[]) => {
                                return LoadEmployeesSuccess({ employees });
                            }),
                            catchError(() => {
                                return of(
                                    ErrorAction({
                                        error: {
                                            type: ErrorType.ERROR_LOAD_EMPLOYEES,
                                            message: 'Wystąpił bląd podczas pobierania pracowników.'
                                        }
                                    })
                                );
                            })
                        )
                    })
                )
            })
        )
    );

    createEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CreateEmployee),
            switchMap(({ createEmployee }) => {
                return this.employeesService.createEmployee(createEmployee).pipe(
                    switchMap((employee: AllEmployees) => {
                        return from([
                            CreateEmployeeSuccess({ employee }),
                            SuccessForm()
                        ]);
                    }),
                    catchError(() => {
                        return of(
                            ErrorAction({
                                error: {
                                    type: ErrorType.ERROR_CREATE_EMPLOYEE,
                                    message: 'Wystąpił bląd podczas tworzenia pracownika.'
                                }
                            })
                        );
                    })
                );
            })
        )
    );
}
