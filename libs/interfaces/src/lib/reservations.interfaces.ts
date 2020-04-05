import { Restaurant, Table, User } from '@bon-appetit/interfaces';

export interface Reservation {
    id?: number;
    tableId: number;
    hour: string;
    date: Date;
    peopleCount: number;
    restaurantId?: number;
    userId?: number;
    user?: User;
    restaurant?: Restaurant;
    status: ReservationStatus;
    table?: Table;
    __user__?: User;
}

export enum ReservationStatus {
    PRZYJETO = 'Przyjęto',
    ANULOWANO = 'Anulowano',
    ZAKONCZONO = 'Zakończono'
}
