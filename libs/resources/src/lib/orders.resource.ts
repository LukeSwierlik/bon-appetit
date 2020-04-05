import { ORDERS_API } from './api';

export const OrdersResource = {
    ordersUser: (userId: number) => `${ORDERS_API}/users/${userId}`,
    ordersRestaurant: (restaurantId: number) => `${ORDERS_API}/restaurant/${restaurantId}`,
    addOrder: `${ORDERS_API}/new`,
    payOrder: `${ORDERS_API}/pay`,
    removeOrder: (userId: number) => `${ORDERS_API}/${userId}`,
    changeOrderStatus: `${ORDERS_API}/change-status`,
};
