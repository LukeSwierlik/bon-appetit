import { Dish, Restaurant } from './restaurants.interfaces';
import { User } from './users.interfaces';

export interface Order {
    id?: number;
    count: number;
    dishId: number;
    restaurantId: number;
    userId: number;
    status?: OrderStatus;
    dish?: Dish;
    price?: number;
    sumPriceDish?: number;
    paid: number;
    user?: User;
    created?: Date;
    __restaurant__?: Restaurant
    __user__?: User;
}

export enum OrderStatus {
    OCZEKUJE_NA_PLATNOSC = 'Oczekuje na platność',
    ZAPLACAONE_I_OCZEKUJE_NA_PRZYGOTOWANIE = 'Zapłacono i oczekuje na przygotowanie',
    W_TRAKCIE_PRZYGOTOWANIA = 'W trakcie przygotowania',
    OCZEKUJE_NA_DOSTAWCE = 'Oczekuje na dostawce',
    W_DRODZE_DO_KLIENTA = 'W drodze do klienta',
    ODEBRANE_PRZEZ_KLIENTA = 'Odebrane przez klienta'
}

export interface UpdateEntity<T> {
    id: number;
    changes: Partial<T>;
}

export interface ViewOrder {
    id?: number;
    dishes?: ViewDish[],
    restaurant?: Restaurant;
}

export interface ViewDish {
    dish: Dish,
    count: number;
    sumPriceDish?: number;
    price: number;
    status?: OrderStatus;
}
