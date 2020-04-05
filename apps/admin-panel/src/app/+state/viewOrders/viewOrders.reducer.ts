import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Order, OrderStatus, ViewOrder } from '@bon-appetit/interfaces';
import {
    ViewSuccessRemoveOrder,
    ViewSuccessFetchOrdersUser,
    ViewClearOrders,
    ViewSuccessAddToOrders,
    ViewUpdateOrder,
    ViewSuccessPayOrders,
    ViewFetchOrdersRestaurantSuccess
} from './viewOrders.actions';

export const ordersEntityAdapter = createEntityAdapter<ViewOrder>();

export interface ViewOrdersState extends EntityState<ViewOrder> {
    error: boolean;
    loading: boolean;
    sumOrder: number;
    isPay: boolean;
}

export const initialState: ViewOrdersState = ordersEntityAdapter.getInitialState({
    error: false,
    loading: false,
    sumOrder: 0,
    isPay: false,
});

export const reducer = createReducer(
    initialState,
    on(ViewSuccessAddToOrders, (state, action) => {
        return {
            ...ordersEntityAdapter.addOne(action.order, {
                ...state,
            })
        };
    }),
    on(ViewSuccessFetchOrdersUser, (state, action)=> {
        return {
            ...ordersEntityAdapter.addMany(action.orders, {
                ...state,
            })
        }
    }),
    on(ViewUpdateOrder, (state, action) => {
        return {
            ...ordersEntityAdapter.updateOne(action.changes, state)
        }
    }),
    on(ViewSuccessRemoveOrder, (state, action) => {
        return ordersEntityAdapter.removeOne(action.orderId, state);
    }),
    on(ViewSuccessPayOrders, (state, action) => {
        return ordersEntityAdapter.updateMany(action.changes, {
            ...state,
            isPay: true,
        });
    }),
    on(ViewFetchOrdersRestaurantSuccess, (state, action)=> {
        return ordersEntityAdapter.addMany(action.orders, state);
    }),
    on(ViewClearOrders, (state) => {
        return ordersEntityAdapter.removeAll(initialState);
    })
);

export function viewOrderReducer(state: ViewOrdersState | undefined, action: Action) {
    return reducer(state, action);
}
