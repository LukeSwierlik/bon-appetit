import {
    addToOrder,
    addToOrderError,
    addToOrderSuccess,
    fetchOrders,
    fetchOrdersUserError,
    fetchOrdersUserSuccess,
    payOrdersSuccess
} from './orders.types';
import { addOrder, loadOrders, payOrders } from './orders.service';
import { Order } from '@bon-appetit/interfaces';

export const fetchOrdersAction = (userId: number) => (dispatch): void => {
    dispatch(fetchOrders());

    loadOrders(userId)
        .then(res => {
            dispatch(fetchOrdersUserSuccess(res.data));
        })
        .catch(e => {
            console.error('[fetchOrdersAction] error', e);
            dispatch(fetchOrdersUserError());
        });
};

export const addToOrderAction = (count: number, dishId: number, restaurantId: number, userId: number) => (dispatch): void => {
    addOrder({
        count,
        dishId,
        restaurantId,
        userId
    })
        .then(res => {
            dispatch(addToOrderSuccess(res.data));
        })
        .catch(e => {
            console.error('[addToOrderAction] error', e);
            dispatch(addToOrderError());
        });
};

export const payOrdersAction = (orders: Order[]) => (dispatch): void => {
    payOrders(orders)
        .then(res => {
            dispatch(payOrdersSuccess());
        })
        .catch(e => {
            console.error('[payOrdersAction] e', e);
        });
};
