import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '@bon-appetit/interfaces';
import { OrdersResource } from '@bon-appetit/resources';

@Injectable({
    providedIn: 'root'
})
export class ViewOrdersService {
    constructor(private httpClient: HttpClient) {
    }

    getOrdersUser(userId: number): Observable<any> {
        return this.httpClient.get(OrdersResource.ordersUser(userId));
    }

    getOrdersRestaurant(restaurantId: number): Observable<any> {
        return this.httpClient.get(OrdersResource.ordersRestaurant(restaurantId));
    }

    addOrder(order: Order): Observable<any> {
        return this.httpClient.post(OrdersResource.addOrder, order);
    }

    removeOrder(orderId: number): Observable<any> {
        return this.httpClient.delete(OrdersResource.removeOrder(orderId));
    }

    payOrder(orders: Order[]): Observable<any> {
        return this.httpClient.post(OrdersResource.payOrder, orders);
    }
}
