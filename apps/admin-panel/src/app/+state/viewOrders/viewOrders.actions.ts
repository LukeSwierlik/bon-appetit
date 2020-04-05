import { createAction, props } from '@ngrx/store';
import { Order, UpdateEntity, ViewOrder } from '@bon-appetit/interfaces';

export const ViewAddToOrders = createAction('[ViewOrder] Add to Order', props<{ order: Order }>());
export const ViewSuccessAddToOrders = createAction('[ViewOrder] Success Add to Order', props<{ order: ViewOrder }>());
export const ViewUpdateOrder = createAction('[ViewOrder] Update Order', props<{ changes: UpdateEntity<ViewOrder>; }>());

export const ViewFetchOrdersUser = createAction('[ViewOrder] Fetch Orders');
export const ViewSuccessFetchOrdersUser = createAction('[ViewOrder] Success Fetch Orders', props<{ orders: ViewOrder[]; }>());
export const ViewErrorFetchOrders = createAction('[ViewOrder] Error Fetch Orders');

export const ViewRemoveOrder = createAction('[ViewOrder] Remove with Order', props<{ orderId: number; }>());
export const ViewSuccessRemoveOrder = createAction('[ViewOrder] Success Remove with Order', props<{ orderId: number; }>());
export const ViewErrorRemoveOrder = createAction('[ViewOrder] Error Remove with Order');

export const ViewPayOrders = createAction('[ViewOrder] Pay Orders');
export const ViewSuccessPayOrders = createAction('[ViewOrder] Success Pay Orders', props<{ changes: UpdateEntity<ViewOrder>[]; }>());
export const ViewErrorPayOrders = createAction('[ViewOrder] Error Pay Orders');

export const ViewFetchOrdersRestaurant = createAction('[ViewOrders] Fetch Orders Restaurant');
export const ViewFetchOrdersRestaurantSuccess = createAction('[ViewOrders] Fetch Orders Restaurant Success', props<{ orders: ViewOrder[]; }>());

export const ViewClearOrders = createAction('[ViewOrders] Clear Orders');
