import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    CreateRestaurant,
    EditRestaurant,
    LoadCategories,
    LoadCompanyRestaurants,
    LoadRestaurants,
    RemoveRestaurant, SearchRestaurants,
    SuccessCreateRestaurant,
    SuccessEditRestaurant,
    SuccessLoadCategories,
    SuccessLoadRestaurants,
    SuccessRemoveRestaurant
} from './restaurants.actions';
import { catchError, first, map, switchMap, take } from 'rxjs/operators';
import { RestaurantsService } from './restaurants.service';
import { combineLatest, from, Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../index';
import { ErrorAction, SuccessForm } from '../commons/commons.actions';
import { ErrorType, Restaurant, Table } from '@bon-appetit/interfaces';
import { companyQuery } from '../company/company.selectors';
import { LoadTables, SuccessLoadTables } from '../tables/tables.actions';

@Injectable()
export class RestaurantsEffects {
    companyId$: Observable<number> = this.store.pipe(
        select(companyQuery.getCompanyId),
        first<number>(Boolean)
    );

    constructor(private actions$: Actions,
                private restaurantsService: RestaurantsService,
                private store: Store<State>) {}

    loadRestaurants$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadRestaurants),
            switchMap(() => {
                return this.restaurantsService.getRestaurants().pipe(
                    map((restaurants: Restaurant[]) => {
                        return SuccessLoadRestaurants({ restaurants });
                    }),
                    catchError(e => {
                        return of(
                            ErrorAction({
                                error: {
                                    type: ErrorType.ERROR_LOAD_RESTAURANTS,
                                    message: 'Wystąpił bląd podczas pobierania restauracji.'
                                }
                            })
                        );
                    })
                );
            })
        )
    );

    createRestaurant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CreateRestaurant),
            switchMap(({ createRestaurant }) => {
                return this.restaurantsService.create(createRestaurant).pipe(
                    switchMap((restaurant: Restaurant) => {
                        return from([
                            SuccessCreateRestaurant({ restaurant }),
                            SuccessForm()
                        ]);
                    }),
                    catchError(e => {
                        return of(
                            ErrorAction({
                                error: {
                                    type: ErrorType.ERROR_CREATE_RESTAURANT,
                                    message: 'Wystąpił bląd podczas tworzenia restauracji.'
                                }
                            })
                        );
                    })
                );
            })
        )
    );

    editRestaurant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EditRestaurant),
            switchMap(({ editRestaurant }) => {
                return this.restaurantsService.edit(editRestaurant).pipe(
                    map(changes => {
                        return SuccessEditRestaurant({ changes });
                    }),
                    catchError(e => {
                        return of(
                            ErrorAction({
                                error: {
                                    type: ErrorType.ERROR_EDIT_RESTAURANT,
                                    message: 'Wystąpił bląd podczas edycji restauracji.'
                                }
                            })
                        );
                    })
                );
            })
        )
    );

    removeRestaurant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RemoveRestaurant),
            switchMap(({ restaurantId }) => {
                return this.restaurantsService.remove(restaurantId).pipe(
                    map(() => {
                        return SuccessRemoveRestaurant({ restaurantId });
                    }),
                    catchError(e => {
                        return of(
                            ErrorAction({
                                error: {
                                    type: ErrorType.ERROR_REMOVE_RESTAURANT,
                                    message: 'Wystąpił bląd podczas usuwania restauracji.'
                                }
                            })
                        );
                    })
                );
            })
        )
    );

    loadCategories = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadCategories),
            switchMap(() => {
                return this.restaurantsService.loadCategories().pipe(
                    map((categories: []) => {
                        return SuccessLoadCategories({ categories });
                    }),
                    catchError(e => {
                        return of(
                            ErrorAction({
                                error: {
                                    type: ErrorType.ERROR_REMOVE_RESTAURANT,
                                    message: 'Wystąpił bląd podczas usuwania restauracji.'
                                }
                            })
                        );
                    })
                );
            })
        )
    );

    loadRestaurantsCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadCompanyRestaurants),
            switchMap(() => {
                return combineLatest([this.companyId$]).pipe(
                    switchMap(([ companyId]) => {
                        return this.restaurantsService.searchRestaurantCompany(companyId).pipe(
                            map((restaurants: Restaurant[]) => {

                                return SuccessLoadRestaurants({
                                    restaurants
                                });
                            }),
                            catchError(() => {
                                return of(
                                    ErrorAction({
                                        error: {
                                            type: ErrorType.ERROR_LOAD_RESTAURANTS,
                                            message: 'Wystąpił bląd podczas pobierania restauracji.'
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

    searchRestaurants$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SearchRestaurants),
            switchMap(({ searchQuery }) => {
                return this.restaurantsService.searchRestaurant(searchQuery).pipe(
                    map(restaurants => {
                        return SuccessLoadRestaurants({ restaurants });
                    })
                )
            })
        )
    )
}
