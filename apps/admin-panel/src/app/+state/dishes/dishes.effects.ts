import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { combineLatest, from, Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../index';
import { restaurantsQuery } from '../restaurants/restaurants.selectors';
import { DishesService } from './dishes.service';
import {
    CreateDish, EditDish,
    LoadDishes,
    LoadTemplates, RemoveDish,
    SuccessCreateDish, SuccessEditDish,
    SuccessLoadDishes,
    SuccessLoadTemplates, SuccessRemoveDish
} from './dishes.actions';
import { ErrorAction, SuccessForm } from '../commons/commons.actions';
import { Dish, ErrorType, Template } from '@bon-appetit/interfaces';

@Injectable()
export class DishesEffects {
    restaurantCompanyId$: Observable<number> = this.store.pipe(
        select(restaurantsQuery.getRestaurantCompanyId),
        first<number>(Boolean));

    restaurantTemplate$: Observable<string> = this.store.pipe(
        select(restaurantsQuery.getTemplate),
        first<string>(Boolean));

    constructor(private actions$: Actions,
                private dishesService: DishesService,
                private store: Store<State>) {
    }

    loadDishes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadDishes),
            switchMap(() => {
                return combineLatest([
                    this.restaurantCompanyId$,
                    this.restaurantTemplate$
                ]).pipe(
                    switchMap(([companyId, template]) => {
                        return this.dishesService.loadDishes(companyId, template).pipe(
                            map((dishes: Dish[]) => {
                                return SuccessLoadDishes({
                                    dishes
                                });
                            }),
                            catchError(e => {
                                return of(ErrorAction({
                                    error: {
                                        type: ErrorType.ERROR_LOAD_DISHES,
                                        message: 'Wystąpił bląd podczas pobierania dań.'
                                    }
                                }));
                            })
                        );
                    })
                )

            })
        )
    );

    createDish$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CreateDish),
            switchMap(({ createDish }) => {
                return combineLatest([this.restaurantCompanyId$]).pipe(
                    switchMap(([companyId]) => {
                        return this.dishesService.createDish({
                            ...createDish,
                            companyId
                        }).pipe(
                            switchMap((dish: Dish) => {
                                return from([
                                    SuccessCreateDish({ dish }),
                                    SuccessForm()
                                ]);
                            }),
                            catchError(() => {
                                return of(ErrorAction({
                                    error: {
                                        type: ErrorType.ERROR_CREATE_DISH,
                                        message: 'Wystąpił bląd podczas tworzenia daia.'
                                    }
                                }));
                            })
                        )
                    })
                )
            })
        )
    );

    loadTemplates$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadTemplates),
            switchMap(() => {
                return combineLatest([this.restaurantCompanyId$]).pipe(
                    switchMap(([companyId]) => {

                        return this.dishesService.loadTemplates(companyId).pipe(
                            map((templates: Template[]) => {

                                return SuccessLoadTemplates({
                                    templates
                                });
                            }),
                            catchError(() => {
                                return of(ErrorAction({
                                    error: {
                                        type: ErrorType.ERROR_LOAD_TEMPLATES,
                                        message: 'Wystąpił bląd podczas pobienia szablonów restauracji.'
                                    }
                                }));
                            })
                        );
                    })
                )
            })
        )
    );

    removeDish$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RemoveDish),
            switchMap(({ dishId }) => {
                return this.dishesService.removeDish(dishId).pipe(
                    map(() => {
                        return SuccessRemoveDish({ dishId });
                    })
                )
            })
        )
    );

    editDish$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EditDish),
            switchMap(({ editDish }) => {
                return this.dishesService.editDish(editDish).pipe(
                    switchMap((dish: Dish) => {
                        return from([
                            SuccessRemoveDish({ dishId: editDish.id }),
                            SuccessCreateDish({ dish })
                        ]);
                    })
                )
            })
        )
    )
}
