import { State } from '../index';
import { ordersEntityAdapter } from './viewOrders.reducer';
import { createSelector } from '@ngrx/store';

const getOrdersState = (state: State) => state.viewOrder;

const { selectAll, selectEntities, selectIds, selectTotal } = ordersEntityAdapter.getSelectors();

const getSumCountOrder = createSelector(
    getOrdersState,
    (orders) => orders ? orders.sumOrder : 0
);

const getOrders = createSelector(
    getOrdersState,
    (orders) => selectAll(orders)
);

const getOrder = createSelector(
    getOrders,
    (orders, id: number) => {
        return orders.find(order => order.id === id);
    }
);

// const getSumOrders = createSelector(
//     getOrders,
//     (orders) => {
//         let sumOrders = 0;
//
//         orders.forEach(order => {
//             sumOrders += order.dishes.count
//         });
//
//         return sumOrders;
//     }
// );

const getIsPay = createSelector(
    getOrdersState,
    (orders) => orders.isPay
);

// const getNoPaidOrders = createSelector(
//     getOrders,
//     (orders) => {
//         return orders.filter(order => order.paid !== 1)
//     }
// );

export const ordersQuery = {
    getSumCountOrder,
    getOrders,
    getOrder,
    // getSumOrders,
    getIsPay,
};
