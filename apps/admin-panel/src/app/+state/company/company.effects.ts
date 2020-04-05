import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CompanyService } from './company.service';
import {
    CreateCompany,
    FetchCompany,
    SuccessCreateCompany,
    SuccessFetchCompany
} from './company.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { ErrorAction, ErrorForm, SuccessForm } from '../commons/commons.actions';
import { Company, ErrorType } from '@bon-appetit/interfaces';

@Injectable()
export class CompanyEffects {
    constructor(private actions$: Actions, private companyService: CompanyService) {}

    fetchCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchCompany),
            switchMap(action => {
                return this.companyService.getCompany(action.ownerId).pipe(
                    map(company => {
                        return SuccessFetchCompany({
                            company
                        });
                    }),
                    catchError(() => {
                        return of(
                            ErrorAction({
                                error: {
                                    type: ErrorType.ERROR_FETCH_COMPANY,
                                    message: 'Wystąpił problem przy pobraniu informcji o firmie.'
                                }
                            })
                        );
                    })
                );
            })
        )
    );

    createCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CreateCompany),
            switchMap(({ createCompany }) => {
                return this.companyService.createCompany(createCompany).pipe(
                    switchMap((company: Company) => {
                        return from([
                            SuccessCreateCompany({ company }),
                            SuccessForm()
                        ]);
                    }),
                    catchError(({ message }) => {
                        return from([
                            ErrorForm({
                                message
                            }),
                            ErrorAction({
                                error: {
                                    type: ErrorType.ERROR_CREATE_COMPANY,
                                    message: 'Wystapił błąd podczas tworzenia firmy. Spróbuj ponownie później.'
                                }
                            })
                        ]);
                    })
                );
            })
        )
    );
}
