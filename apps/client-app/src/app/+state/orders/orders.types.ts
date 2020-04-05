import { Order } from '@bon-appetit/interfaces';

export const OrdersActions = {
    FETCH_ORDERS_USER: 'Fetch Orders User',
    FETCH_ORDERS_USER_SUCCESS: 'Fetch Orders User Success',
    FETCH_ORDERS_USER_ERROR: 'Fetch Orders User Error',
    ADD_TO_ORDER: 'Add To Order',
    ADD_TO_ORDER_SUCCESS: 'Add To Order Success',
    ADD_TO_ORDER_ERROR: 'Add To Order Error',
    PAY_ORDERS: 'Pay Orders',
    PAY_ORDERS_SUCCESS: 'Pay Orders Success',
    PAY_ORDERS_ERROR: 'Pay Orders Error',
};

export interface FetchOrders {
    type: typeof OrdersActions.FETCH_ORDERS_USER;
}

export interface FetchOrdersUserSuccess {
    type: typeof OrdersActions.FETCH_ORDERS_USER_SUCCESS;
    orders: Order[];
}

export interface FetchOrdersUserError {
    type: typeof OrdersActions.FETCH_ORDERS_USER_ERROR;
}

export interface AddToOrder {
    type: typeof OrdersActions.ADD_TO_ORDER;
    count: number;
    dishId: number;
    restaurantId: number;
    userId: number;
}

export interface AddToOrderSuccess {
    type: typeof OrdersActions.ADD_TO_ORDER_SUCCESS;
    order: Order;
}

export interface AddToOrderError {
    type: typeof OrdersActions.ADD_TO_ORDER_ERROR;
}

export interface PayOrders {
    type: typeof OrdersActions.PAY_ORDERS;
    orders: Order[];
}

export interface PayOrdersSuccess {
    type: typeof OrdersActions.PAY_ORDERS_SUCCESS;
}

export interface PayOrdersError {
    type: typeof OrdersActions.PAY_ORDERS_ERROR;
}

export const fetchOrders = (): FetchOrders => {
    return {
        type: OrdersActions.FETCH_ORDERS_USER,
    }
};

export const fetchOrdersUserSuccess = (orders: Order[]): FetchOrdersUserSuccess => {
    return {
        type: OrdersActions.FETCH_ORDERS_USER_SUCCESS,
        orders,
    }
};

export const fetchOrdersUserError = (): FetchOrdersUserError => {
    return {
        type: OrdersActions.FETCH_ORDERS_USER_ERROR,
    }
};

export const addToOrder = (count: number, dishId: number, restaurantId: number, userId: number): AddToOrder => {
    return {
        type: OrdersActions.ADD_TO_ORDER,
        count,
        dishId,
        restaurantId,
        userId
    }
};

export const addToOrderSuccess = (order: Order): AddToOrderSuccess => {
    return {
        type: OrdersActions.ADD_TO_ORDER_SUCCESS,
        order,
    }
};

export const addToOrderError = (): AddToOrderError => {
    return {
        type: OrdersActions.ADD_TO_ORDER_ERROR,
    }
};

export const payOrders = (orders: Order[]): PayOrders => {
    return {
        type: OrdersActions.PAY_ORDERS,
        orders,
    }
};

export const payOrdersSuccess = (): PayOrdersSuccess => {
    return {
        type: OrdersActions.PAY_ORDERS_SUCCESS,
    }
};

export const payOrdersError = (): PayOrdersError => {
    return {
        type: OrdersActions.PAY_ORDERS_ERROR,
    }
};

export type OrdersActionsType =
    FetchOrders |
    FetchOrdersUserSuccess |
    FetchOrdersUserError |
    AddToOrder |
    AddToOrderSuccess |
    AddToOrderError |
    PayOrders |
    PayOrdersSuccess |
    PayOrdersError;
