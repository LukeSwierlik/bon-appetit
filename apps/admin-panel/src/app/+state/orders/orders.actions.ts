import { createAction, props } from '@ngrx/store';
import { Order, OrderStatus, UpdateEntity } from '@bon-appetit/interfaces';

export const AddToOrders = createAction('[Order] Add to Order', props<{ order: Order }>());
export const SuccessAddToOrders = createAction('[Order] Success Add to Order', props<{ order: Order }>());
export const UpdateOrder = createAction('[Order] Update Order', props<{ changes: UpdateEntity<Order>; }>());

export const FetchOrdersUser = createAction('[Order] Fetch Orders');
export const SuccessFetchOrdersUser = createAction('[Order] Success Fetch Orders', props<{ orders: Order[]; }>());
export const ErrorFetchOrders = createAction('[Order] Error Fetch Orders');

export const RemoveOrder = createAction('[Order] Remove with Order', props<{ orderId: number; }>());
export const SuccessRemoveOrder = createAction('[Order] Success Remove with Order', props<{ orderId: number; }>());
export const ErrorRemoveOrder = createAction('[Order] Error Remove with Order');

export const PayOrders = createAction('[Order] Pay Orders');
export const SuccessPayOrders = createAction('[Order] Success Pay Orders', props<{ changes: UpdateEntity<Order>[]; }>());
export const ErrorPayOrders = createAction('[Order] Error Pay Orders');

export const FetchOrdersRestaurant = createAction('[Orders] Fetch Orders Restaurant');
export const FetchOrdersRestaurantSuccess = createAction('[Orders] Fetch Orders Restaurant Success', props<{ orders: Order[]; }>());

export const ClearOrders = createAction('[Orders] Clear Orders');

export const ChangeOrderStatus = createAction('[Orders] Change Order Status', props<{ orderId: number, orderStatus: OrderStatus }>());
export const ChangeOrderStatusSuccess = createAction('[Orders] Change Order Status Success', props<{ update: UpdateEntity<Order> }>());
