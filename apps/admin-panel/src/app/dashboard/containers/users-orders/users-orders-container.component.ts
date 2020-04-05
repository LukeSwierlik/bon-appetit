import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { Order, OrderStatus } from '@bon-appetit/interfaces';
import { ordersQuery } from '../../../+state/orders/orders.selectors';
import { FetchOrdersRestaurant, FetchOrdersUser } from '../../../+state/orders/orders.actions';
import { ViewFetchOrdersUser } from '../../../+state/viewOrders/viewOrders.actions';
import { SelectedRestaurant } from '../../../+state/restaurants/restaurants.actions';
import { Router } from '@angular/router';
import { AlertType } from '../../../components/alert/alert.component';

@Component({
    selector: 'tin-users-orders',
    templateUrl: './users-orders-container.component.html'
})
export class UsersOrdersContainerComponent implements OnInit {
    orders$: Observable<Order[]> = this.store.pipe(select(ordersQuery.getOrders));

    readonly AlertType = AlertType;

    constructor(private store: Store<State>,
                private router: Router) {
    }

    ngOnInit(): void {
        this.store.dispatch(FetchOrdersUser())
        // this.store.dispatch(ViewFetchOrdersUser());
    }

    showRestaurant(restaurantId: number): void {
        this.store.dispatch(SelectedRestaurant({ restaurantId }));
        this.router.navigate(['/company/restaurants', restaurantId]);
    }

    getDate(date: Date): string {
        return new Date(date).toLocaleString();
    }

    getClassOrderStatus(status: OrderStatus): string {
        switch(status) {
            case OrderStatus.OCZEKUJE_NA_PLATNOSC: {
                return 'badge-danger';
            }
            case OrderStatus.ZAPLACAONE_I_OCZEKUJE_NA_PRZYGOTOWANIE: {
                return 'badge-success';
            }
            case OrderStatus.W_TRAKCIE_PRZYGOTOWANIA:
            case OrderStatus.OCZEKUJE_NA_DOSTAWCE: {
                return 'badge-primary';
            }
            case OrderStatus.W_DRODZE_DO_KLIENTA:
            case OrderStatus.ODEBRANE_PRZEZ_KLIENTA: {
                return 'badge-secondary';
            }
        }
    }
}


