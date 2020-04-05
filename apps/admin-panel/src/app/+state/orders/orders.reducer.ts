import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Order } from '@bon-appetit/interfaces';
import {
    UpdateOrder,
    SuccessAddToOrders,
    SuccessFetchOrdersUser,
    SuccessRemoveOrder,
    SuccessPayOrders,
    FetchOrdersRestaurantSuccess,
    ClearOrders,
    ChangeOrderStatusSuccess
} from './orders.actions';

export const ordersEntityAdapter = createEntityAdapter<Order>();

export interface OrdersState extends EntityState<Order> {
    error: boolean;
    loading: boolean;
    sumOrder: number;
    isPay: boolean;
}

export const initialState: OrdersState = ordersEntityAdapter.getInitialState({
    error: false,
    loading: false,
    sumOrder: 0,
    isPay: false
});

export const reducer = createReducer(
    initialState,
    on(SuccessAddToOrders, (state, action) => {
        return {
            ...ordersEntityAdapter.addOne(action.order, {
                ...state,
                sumOrder: Math.round(state.sumOrder + action.order.count)
            })
        };
    }),
    on(SuccessFetchOrdersUser, (state, action) => {
        return {
            ...ordersEntityAdapter.addAll(action.orders, {
                ...state,
                sumOrder: action.orders.reduce((acc, next) => {
                    return acc + next.sumPriceDish;
                }, 0),
                isPay: action.orders.every(order => order.paid === 1)
            })
        };
    }),
    on(UpdateOrder, (state, action) => {
        return {
            ...ordersEntityAdapter.updateOne(action.changes, state)
        };
    }),
    on(SuccessRemoveOrder, (state, action) => {
        return ordersEntityAdapter.removeOne(action.orderId, state);
    }),
    on(SuccessPayOrders, (state, action) => {
        return ordersEntityAdapter.updateMany(action.changes, {
            ...state,
            isPay: true
        });
    }),
    on(FetchOrdersRestaurantSuccess, (state, action) => {
        return ordersEntityAdapter.addAll(action.orders, state);
    }),
    on(ClearOrders, state => {
        return ordersEntityAdapter.removeAll(initialState);
    }),
    on(ChangeOrderStatusSuccess, (state, { update }) => {
        return ordersEntityAdapter.updateOne(update, state);
    })
);

export function orderReducer(state: OrdersState | undefined, action: Action) {
    return reducer(state, action);
}
