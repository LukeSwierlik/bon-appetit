import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { ReservationEntity } from '../reservation/reservation.entity';

@Entity('table')
export class TableEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({
        name: 'max_people_count',
        type: 'integer'
    })
    maxPeopleCount: number;

    @Column()
    restaurantId: number;

    @ManyToOne(type => RestaurantEntity, restaurant => restaurant.tables)
    restaurant: Promise<RestaurantEntity>;

    @OneToMany(type => ReservationEntity, reservation => reservation.table)
    @JoinColumn()
    reservations: ReservationEntity[];
}
