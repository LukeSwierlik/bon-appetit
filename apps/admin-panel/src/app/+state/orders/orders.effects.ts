import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    AddToOrders,
    ChangeOrderStatus,
    ChangeOrderStatusSuccess,
    ErrorFetchOrders,
    ErrorPayOrders,
    ErrorRemoveOrder,
    FetchOrdersRestaurant,
    FetchOrdersRestaurantSuccess,
    FetchOrdersUser,
    PayOrders,
    RemoveOrder,
    SuccessAddToOrders,
    SuccessFetchOrdersUser,
    SuccessPayOrders,
    SuccessRemoveOrder,
    UpdateOrder
} from './orders.actions';
import { catchError, first, map, switchMap, take } from 'rxjs/operators';
import { OrdersService } from './orders.service';
import { combineLatest, Observable, of } from 'rxjs';
import { authQuery } from '../auth/auth.selectors';
import { select, Store } from '@ngrx/store';
import { State } from '../index';
import { ordersQuery } from './orders.selectors';
import { Order, OrderStatus, UpdateEntity } from '@bon-appetit/interfaces';
import { restaurantsQuery } from '../restaurants/restaurants.selectors';

@Injectable()
export class OrdersEffects {
    selectedRestaurantId$: Observable<number> = this.store.pipe(select(restaurantsQuery.getSelectedRestaurant), first<number>(Boolean));

    userId$: Observable<number> = this.store.pipe(select(authQuery.getUserId), first<number>(Boolean));

    orders$: Observable<Order[]> = this.store.pipe(select(ordersQuery.getNoPaidOrders));

    constructor(private actions$: Actions, private ordersService: OrdersService, private store: Store<State>) {}

    fetchUserOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchOrdersUser),
            switchMap(() => {
                return combineLatest([this.userId$]).pipe(
                    take(1),
                    switchMap(([userId]) => {
                        return this.ordersService.getOrdersUser(userId).pipe(
                            map(orders => {
                                return orders.map(order => {
                                    return {
                                        ...order,
                                        sumPriceDish: Math.round(order.count * order.dish.price)
                                    };
                                });
                            }),
                            map(orders => {
                                return SuccessFetchOrdersUser({ orders });
                            }),
                            catchError(() => {
                                return of(ErrorFetchOrders());
                            })
                        );
                    })
                );
            })
        )
    );

    fetchRestaurantOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchOrdersRestaurant),
            switchMap(() => {
                return combineLatest([this.selectedRestaurantId$]).pipe(
                    switchMap(([restaurantId]) => {
                        return this.ordersService.getOrdersRestaurant(restaurantId).pipe(
                            map(orders => {
                                return orders.map(order => {
                                    return {
                                        ...order,
                                        sumPriceDish: Math.round(order.count * order.dish.price)
                                    };
                                });
                            }),
                            map(orders => {
                                return FetchOrdersRestaurantSuccess({ orders });
                            }),
                            catchError(() => {
                                return of(ErrorFetchOrders());
                            })
                        );
                    })
                );
            })
        )
    );

    addNewOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddToOrders),
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
                                                    sumPriceDish: Math.round(response.count * response.dish.price)
                                                };

                                                return SuccessAddToOrders({ order: updateOrder });
                                            }

                                            const changes: UpdateEntity<Order> = {
                                                id: response.id,
                                                changes: {
                                                    count: response.count
                                                }
                                            };

                                            return UpdateOrder({ changes });
                                        })
                                    );
                                }),
                                catchError(() => {
                                    return of(ErrorFetchOrders());
                                })
                            );
                    })
                );
            })
        )
    );

    removeWithOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RemoveOrder),
            switchMap(({ orderId }) => {
                return this.ordersService.removeOrder(orderId).pipe(
                    map(() => {
                        return SuccessRemoveOrder({ orderId });
                    }),
                    catchError(() => {
                        return of(ErrorRemoveOrder());
                    })
                );
            })
        )
    );

    payOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayOrders),
            switchMap(() => {
                return combineLatest([this.orders$]).pipe(
                    take(1),
                    switchMap(([orders]) => {
                        return this.ordersService.payOrder(orders).pipe(
                            map(() => {
                                const changes: UpdateEntity<Order>[] = orders.map(order => {
                                    return {
                                        id: order.id,
                                        changes: {
                                            status: OrderStatus.ZAPLACAONE_I_OCZEKUJE_NA_PRZYGOTOWANIE
                                        }
                                    };
                                });

                                return SuccessPayOrders({ changes });
                            }),
                            catchError(() => {
                                return of(ErrorPayOrders());
                            })
                        );
                    })
                );
            })
        )
    );

    changeOrderStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChangeOrderStatus),
            switchMap(({ orderId, orderStatus }) => {
                return this.ordersService.changeOrderStatus(orderId, orderStatus).pipe(
                    map(() => {
                        const update = {
                            id: orderId,
                            changes: {
                                status: orderStatus
                            }
                        };

                        return ChangeOrderStatusSuccess({ update });
                    })
                );
            })
        )
    );
}
