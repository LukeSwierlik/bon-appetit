import axios from 'axios';
import { Order } from '@bon-appetit/interfaces';
import { OrdersResource } from '@bon-appetit/resources';

export const loadOrders = (userId: number) => axios.get(OrdersResource.ordersUser(userId));
export const addOrder = (order: any) => axios.post(OrdersResource.addOrder, order);
export const payOrders = (orders: Order[]) => axios.post(OrdersResource.payOrder, orders);
