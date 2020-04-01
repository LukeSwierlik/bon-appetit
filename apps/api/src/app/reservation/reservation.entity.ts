import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { TableEntity } from '../table/table.entity';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { ReservationStatus } from '@tin-mini-projects/api-interfaces';

@Entity('reservation')
export class ReservationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'people_count',
        type: 'integer'
    })
    peopleCount: number;

    @Column({
        name: 'date',
        type: 'timestamp'
    })
    date: Date;

    @Column()
    hour: string;

    @Column()
    restaurantId: number;

    @Column()
    tableId: number;

    @Column()
    userId: number;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated: Date;

    @Column({
        default: ReservationStatus.PRZYJETO
    })
    status: string;

    @ManyToOne(type => UserEntity, user => user.reservations)
    user: Promise<UserEntity>;

    @ManyToOne(type => TableEntity, user => user.reservations)
    table: TableEntity;

    @ManyToOne(type => RestaurantEntity, res => res.reservations)
    restaurant: RestaurantEntity;
}
