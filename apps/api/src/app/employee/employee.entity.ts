import { Column, ManyToOne, ChildEntity, OneToOne } from 'typeorm';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { UserEntity } from '../user/user.entity';

@ChildEntity()
export class EmployeeEntity extends UserEntity {
    @Column({
        name: 'hours_worked',
        type: 'integer'
    })
    hoursWorked: number;

    @Column({
        name: 'rate_per_hours',
        type: 'integer'
    })
    ratePerHours: number;

    @Column({
        type: 'integer'
    })
    restaurantId: number;

    @OneToOne(type => RestaurantEntity)
    restaurant: RestaurantEntity;

    calculateSalary(): number {
        return this.hoursWorked * this.ratePerHours;
    }
}
