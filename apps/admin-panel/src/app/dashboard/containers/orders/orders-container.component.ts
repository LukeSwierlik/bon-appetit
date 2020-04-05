import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FetchOrdersUser, PayOrders, RemoveOrder } from '../../../+state/orders/orders.actions';
import { ordersQuery } from '../../../+state/orders/orders.selectors';
import { State } from '../../../+state';
import { Observable } from 'rxjs';

@Component({
    selector: 'tin-orders',
    templateUrl: './orders-container.component.html'
})
export class OrdersContainerComponent implements OnInit {
    orders$ = this.store.pipe(select(ordersQuery.getOrders));
    paid$: Observable<boolean> = this.store.pipe(select(ordersQuery.getIsPay));
    getSumOrders$: Observable<number> = this.store.pipe(select(ordersQuery.getSumCountOrder));

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.store.dispatch(FetchOrdersUser());
    }

    removeOrder(orderId: number): void {
        this.store.dispatch(RemoveOrder({ orderId }));
    }

    payOrders(): void {
        this.store.dispatch(PayOrders());
    }
}
