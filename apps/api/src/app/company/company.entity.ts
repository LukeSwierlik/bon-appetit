import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AddressEntity } from '../person/addressEntity';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { UserEntity } from '../user/user.entity';

@Entity('company')
export class CompanyEntity extends AddressEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        name: 'logo_url'
    })
    logoUrl: string;

    @Column({
        type: 'integer'
    })
    ownerId: number;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @OneToMany(() => RestaurantEntity, restaurant => restaurant.company, { cascade: true, eager: true })
    @JoinColumn()
    restaurants: RestaurantEntity[];

    @OneToOne(() => UserEntity, {cascade: true, eager: true})
    @JoinColumn()
    owner: Promise<UserEntity>;

    user: UserEntity;

    public addRestaurant(restaurant: RestaurantEntity): void {
        if (!this.restaurants.includes(restaurant)) {
            this.restaurants.push(restaurant);

            restaurant.setCompany(this);
        }
    }
}
