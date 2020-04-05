import { Order, OrderStatus } from '@bon-appetit/interfaces';
import { OrdersActions, OrdersActionsType } from './orders.types';
import { updateObject } from '../../utility/utility';

export interface OrdersState {
    orders: Order[];
    error: boolean;
    loaded: boolean;
    sumOrder: number;
    isPay: boolean;
}

const INITIAL_STATE: OrdersState = {
    orders: [],
    error: false,
    loaded: true,
    sumOrder: 0,
    isPay: false,
};

const fetchOrdersUser = (state) => {
    return updateObject(state, {
        loaded: false,
    });
};

const fetchOrdersUserSuccess = (state, action) => {
    const updateOrders = action.orders.map(order => {
        return {
            ...order,
            sumPriceDish: Math.round(order.count * order.dish.price)
        };
    });

    return updateObject(state, {
        orders: updateOrders,
        loaded: true,
        isPay: updateOrders.every(order => order.paid === 1),
        sumOrder: updateOrders
            .filter(order => order.paid !== 1)
            .reduce((acc, next) => {
            return acc + next.sumPriceDish;
        }, 0),
    });
};

const fetchOrdersUserError = (state) => {
    return updateObject(state, {
        error: true,
    });
};

const addToOrderSuccess = (state, action) => {
    const newOrders = [...state.orders, action.order];

    return updateObject(state, {
        orders: newOrders,
        sumOrder: Math.round(state.sumOrder + action.order.count),
        isPay: newOrders.every(order => order.paid === 1),
    });
};

const addToOrderError = (state) => {
    return updateObject(state, {
        error: true,
    });
};

const payOrdersSuccess = (state) => {
    const updateOrders = state.orders.map(order => {
        return {
            ...order,
            status: OrderStatus.ZAPLACAONE_I_OCZEKUJE_NA_PRZYGOTOWANIE,
            paid: 1
        }
    });

    return updateObject(state, {
        orders: updateOrders,
        isPay: true,
    });
};

export const ordersReducer = (state = INITIAL_STATE, action: OrdersActionsType) => {
    const payload = {
        [OrdersActions.FETCH_ORDERS_USER]: fetchOrdersUser,
        [OrdersActions.FETCH_ORDERS_USER_SUCCESS]: fetchOrdersUserSuccess,
        [OrdersActions.FETCH_ORDERS_USER_ERROR]: fetchOrdersUserError,
        [OrdersActions.ADD_TO_ORDER_SUCCESS]: addToOrderSuccess,
        [OrdersActions.ADD_TO_ORDER_ERROR]: addToOrderError,
        [OrdersActions.PAY_ORDERS_SUCCESS]: payOrdersSuccess,
    };

    return (payload[action.type] || (() => state))(state, action);
};
