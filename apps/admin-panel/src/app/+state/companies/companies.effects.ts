import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CompaniesService } from './companies.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorAction } from '../commons/commons.actions';
import { ErrorType } from '@bon-appetit/interfaces';
import { FetchCompanies, SearchCompanies, SuccessFetchCompanies } from './companies.actions';

@Injectable()
export class CompaniesEffects {
    constructor(private actions$: Actions, private companyService: CompaniesService) {}

    fetchCompanies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchCompanies),
            switchMap(() => {
                return this.companyService.getCompanies().pipe(
                    map(companies => {
                        return SuccessFetchCompanies({
                            companies
                        });
                    }),
                    catchError(() => {
                        return of(
                            ErrorAction({
                                error: {
                                    type: ErrorType.ERROR_FETCH_COMPANY,
                                    message: 'Wystąpił problem przy pobraniu informcji o firmach.'
                                }
                            })
                        );
                    })
                );
            })
        )
    );

    searchCompanies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SearchCompanies),
            switchMap(({ searchQuery }) => {
                return this.companyService.searchCompanies(searchQuery).pipe(
                    map(companies => {
                        return SuccessFetchCompanies({ companies });
                    })
                )
            })
        )
    )
}
