import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { Order, OrderStatus, User, UserType } from '@bon-appetit/interfaces';
import { ordersQuery } from '../../../+state/orders/orders.selectors';
import { ChangeOrderStatus, FetchOrdersRestaurant } from '../../../+state/orders/orders.actions';
import { AlertType } from '../../../components/alert/alert.component';
import { SelectedUser } from '../../../+state/users/users.actions';
import { Router } from '@angular/router';
import { authQuery } from '../../../+state/auth/auth.selectors';

@Component({
    selector: 'tin-restaurant-orders',
    templateUrl: './restaurant-orders-container.component.html'
})
export class RestaurantOrdersContainerComponent implements OnInit {
    orders$: Observable<Order[]> = this.store.pipe(select(ordersQuery.getOrders));
    user$: Observable<User> = this.store.pipe(select(authQuery.getUserInfo));

    readonly AlertType = AlertType;

    constructor(private store: Store<State>, private router: Router) {}

    ngOnInit(): void {
        this.store.dispatch(FetchOrdersRestaurant());
    }

    getDate(date: Date): string {
        return new Date(date).toLocaleString();
    }

    showUser(selectedUser: number): void {
        this.store.dispatch(SelectedUser({ selectedUser }));

        this.router.navigate(['/users', selectedUser, 'details']);
    }

    generateOptions(userEntity: UserType): OrderStatus[] {
        switch (userEntity) {
            case UserType.COOK: {
                return [OrderStatus.W_TRAKCIE_PRZYGOTOWANIA, OrderStatus.OCZEKUJE_NA_DOSTAWCE];
            }
            case UserType.DELIVERER: {
                return [OrderStatus.W_DRODZE_DO_KLIENTA, OrderStatus.ODEBRANE_PRZEZ_KLIENTA];
            }
            case UserType.OWNER: {
                return [
                    OrderStatus.W_TRAKCIE_PRZYGOTOWANIA,
                    OrderStatus.OCZEKUJE_NA_DOSTAWCE,
                    OrderStatus.W_DRODZE_DO_KLIENTA,
                    OrderStatus.ODEBRANE_PRZEZ_KLIENTA
                ];
            }
        }
    }

    changeStatus(orderId: number, event: any): void {
        const orderStatus = event.target.value;

        this.store.dispatch(ChangeOrderStatus({
            orderId,
            orderStatus
        }));
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
