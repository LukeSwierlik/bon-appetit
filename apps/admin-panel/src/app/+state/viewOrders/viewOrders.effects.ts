import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    ViewAddToOrders,
    ViewErrorFetchOrders,
    ViewErrorPayOrders,
    ViewErrorRemoveOrder,
    ViewFetchOrdersRestaurant,
    ViewFetchOrdersRestaurantSuccess,
    ViewFetchOrdersUser,
    ViewPayOrders,
    ViewRemoveOrder,
    ViewSuccessAddToOrders,
    ViewSuccessFetchOrdersUser,
    ViewSuccessPayOrders,
    ViewSuccessRemoveOrder,
    ViewUpdateOrder
} from './viewOrders.actions';
import { catchError, first, map, switchMap, take } from 'rxjs/operators';
import { ViewOrdersService } from './viewOrders.service';
import { combineLatest, Observable, of } from 'rxjs';
import { authQuery } from '../auth/auth.selectors';
import { select, Store } from '@ngrx/store';
import { State } from '../index';
import { ordersQuery } from './viewOrders.selectors';
import { Order, UpdateEntity, ViewDish, ViewOrder } from '@bon-appetit/interfaces';
import { restaurantsQuery } from '../restaurants/restaurants.selectors';

@Injectable()
export class ViewOrdersEffects {
    selectedRestaurantId$: Observable<number> = this.store.pipe(
        select(restaurantsQuery.getSelectedRestaurant),
        first<number>(Boolean)
    );

    userId$: Observable<number> = this.store.pipe(
        select(authQuery.getUserId),
        first<number>(Boolean)
    );

    // orders$: Observable<Order[]> = this.store.pipe(select(ordersQuery.getNoPaidOrders));

    constructor(private actions$: Actions, private ordersService: ViewOrdersService, private store: Store<State>) {}

    fetchUserOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ViewFetchOrdersUser),
            switchMap(() => {
                return combineLatest([this.userId$])
                    .pipe(
                        take(1),
                        switchMap(([userId]) => {
                            return this.ordersService
                                .getOrdersUser(userId)
                                .pipe(
                                    map(orders => {
                                        return orders.map(order => {
                                            return {
                                                ...order,
                                                sumPriceDish: order.count * order.dish.price
                                            };
                                        });
                                    }),
                                    map((orders: Order[]) => {
                                        const restaurantsDistinct = new Set();
                                        const uniqueRestaurant = orders
                                            .map(order => {
                                                if (!restaurantsDistinct.has(order.__restaurant__.id)) {
                                                    restaurantsDistinct.add(order.__restaurant__.id);

                                                    return {
                                                        restaurant: order.__restaurant__,
                                                        id: order.id,
                                                    };
                                                }
                                            })
                                            .filter(restaurant => !!restaurant);

                                        const viewOrders: ViewOrder[] = uniqueRestaurant.map(r => {
                                            const dishes: ViewDish[] = orders.map(order => {
                                                if (order.restaurantId === r.restaurant.id) {
                                                    return {
                                                        dish: order.dish,
                                                        count: order.count,
                                                        sumPriceDish: order.sumPriceDish,
                                                        price: order.price,
                                                        status: order.status,
                                                    };
                                                }
                                            })
                                            .filter(dish => !!dish);

                                            return {
                                                dishes,
                                                ...r,
                                            }
                                        });

                                        console.log('viewOrder', viewOrders);

                                        return viewOrders;
                                    }),
                                    map(orders => {
                                        return ViewSuccessFetchOrdersUser({ orders });
                                    }),
                                    catchError(() => {
                                        return of(ViewErrorFetchOrders());
                                    }),
                                )
                        })
                    )
            })
        )
    );

    fetchRestaurantOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ViewFetchOrdersRestaurant),
            switchMap(() => {
                return combineLatest([this.selectedRestaurantId$]).pipe(
                    switchMap(([restaurantId]) => {
                        return this.ordersService.getOrdersRestaurant(restaurantId).pipe(
                            map(orders => {
                                return orders.map(order => {
                                    return {
                                        ...order,
                                        sumPriceDish: order.count * order.dish.price
                                    };
                                });
                            }),
                            map(orders => {
                                return ViewFetchOrdersRestaurantSuccess({ orders });
                            }),
                            catchError(() => {
                                return of(ViewErrorFetchOrders());
                            })
                        );
                    })
                );
            })
        )
    );

    addNewOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ViewAddToOrders),
            switchMap(({ order }) => {
                return combineLatest([this.userId$]).pipe(
                    take(1),
                    switchMap(([userId]) => {
                        return this.ordersService
                            .addOrder({
                                ...order,
                                userId
                            })
                            .pipe(
                                switchMap(response => {
                                    return combineLatest([this.store.pipe(select(ordersQuery.getOrder, response.id))]).pipe(
                                        take(1),
                                        map(([existed]) => {
                                            if (!existed) {
                                                const updateOrder = {
                                                    ...response,
                                                    sumPriceDish: response.count * response.dish.price
                                                };

                                                return ViewSuccessAddToOrders({ order: updateOrder });
                                            }

                                            const changes: UpdateEntity<Order> = {
                                                id: response.id,
                                                changes: {
                                                    count: response.count
                                                }
                                            };

                                            return ViewUpdateOrder({ changes });
                                        })
                                    );
                                }),
                                catchError(() => {
                                    return of(ViewErrorFetchOrders());
                                })
                            );
                    })
                );
            })
        )
    );

    removeWithOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ViewRemoveOrder),
            switchMap(({ orderId }) => {
                return this.ordersService.removeOrder(orderId).pipe(
                    map(() => {
                        return ViewSuccessRemoveOrder({ orderId });
                    }),
                    catchError(() => {
                        return of(ViewErrorRemoveOrder());
                    })
                );
            })
        )
    );
    //
    // payOrders$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(ViewPayOrders),
    //         switchMap(() => {
    //             return combineLatest([this.orders$]).pipe(
    //                 take(1),
    //                 switchMap(([orders]) => {
    //                     return this.ordersService.payOrder(orders).pipe(
    //                         map(() => {
    //                             const changes: UpdateEntity<Order>[] = orders.map(order => {
    //                                 return {
    //                                     id: order.id,
    //                                     changes: {
    //                                         status: OrderStatus.ZAPLACAONE_I_OCZEKUJE_NA_PRZYGOTOWANIE
    //                                     }
    //                                 };
    //                             });
    //
    //                             return ViewSuccessPayOrders({ changes });
    //                         }),
    //                         catchError(() => {
    //                             return of(ViewErrorPayOrders());
    //                         })
    //                     );
    //                 })
    //             );
    //         })
    //     )
    // );
}
