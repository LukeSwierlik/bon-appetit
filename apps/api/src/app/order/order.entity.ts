import {
    Column,
    Entity,
    JoinColumn, JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { DishEntity } from '../dish/dish.entity';
import { UserEntity } from '../user/user.entity';
import { OrderStatus } from '@bon-appetit/interfaces';

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number | string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated: Date;

    @Column({
        type: 'integer'
    })
    restaurantId: number;

    @Column({
        type: 'integer'
    })
    userId: number;

    @Column({
        type: 'integer'
    })
    dishId: number;

    @Column({
        type: 'integer'
    })
    count: number;

    @Column({
        type: 'integer',
        default: 0,
    })
    paid: number;

    @Column({
        default: OrderStatus.OCZEKUJE_NA_PLATNOSC
    })
    status: string;

    @Column({
        nullable: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    finished: Date;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: Promise<UserEntity>;

    @ManyToOne(type => RestaurantEntity, restaurant => restaurant.orders)
    @JoinColumn()
    restaurant: Promise<RestaurantEntity>;

    @ManyToOne(() => DishEntity, dish => dish.orders, { cascade: true, eager: true })
    @JoinColumn()
    dish: DishEntity;
}
