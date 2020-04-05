import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { combineLatest, from, Observable, of } from 'rxjs';
import { TablesService } from './tables.service';
import { CreateTable, LoadTables, SuccessCreateTable, SuccessLoadTables } from './tables.actions';
import { ErrorType, Table } from '@bon-appetit/interfaces';
import { ErrorAction, SuccessForm } from '../commons/commons.actions';
import { select, Store } from '@ngrx/store';
import { restaurantsQuery } from '../restaurants/restaurants.selectors';
import { State } from '../index';

@Injectable()
export class TablesEffects {
    restaurantId$: Observable<number> = this.store.pipe(
        select(restaurantsQuery.getRestaurantId),
        first<number>(Boolean)
    );

    constructor(private actions$: Actions,
                private tablesService: TablesService,
                private store: Store<State>) {}

    loadTables$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadTables),
            switchMap(() => {
                return combineLatest([this.restaurantId$]).pipe(
                    switchMap(([ restaurantId]) => {
                        return this.tablesService.loadTables(restaurantId).pipe(
                            map((tables: Table[]) => {
                                return SuccessLoadTables({
                                    tables
                                });
                            }),
                            catchError(() => {
                                return of(
                                    ErrorAction({
                                        error: {
                                            type: ErrorType.ERROR_LOAD_TABLES,
                                            message: 'Wystąpił bląd podczas pobierania stołów.'
                                        }
                                    })
                                );
                            })
                        );
                    })
                )
            })
        )
    );

    createTable$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CreateTable),
            switchMap(({ createTable }) => {
                return this.tablesService.createTable(createTable).pipe(
                    switchMap((table: Table) => {
                        return from([
                            SuccessCreateTable({ table }),
                            SuccessForm()
                        ]);
                    }),
                    catchError(() => {
                        return of(
                            ErrorAction({
                                error: {
                                    type: ErrorType.ERROR_CREATE_TABLE,
                                    message: 'Wystąpił bląd podczas utworzenia stołu.'
                                }
                            })
                        );
                    })
                );
            })
        )
    );
}
