import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { OrderEntity } from '../order/order.entity';
import { AddressEntity } from '../person/addressEntity';
import { CompanyEntity } from '../company/company.entity';
import { TableEntity } from '../table/table.entity';
import { ReservationEntity } from '../reservation/reservation.entity';
import { CategoryEntity } from '../category/category.entity';
import { EditRestaurantDto } from './dto/EditRestaurantDto';

@Entity('restaurant')
export class RestaurantEntity extends AddressEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        name: 'website_url'
    })
    websiteUrl: string;

    @Column({
        name: 'logo_url'
    })
    logoUrl: string;

    @Column({
        name: 'hero_url'
    })
    heroUrl: string;

    @Column({
        name: 'thumbnail_url'
    })
    thumbnailUrl: string;

    @Column({
        default: false
    })
    opened: boolean;

    @Column()
    email: string;

    @Column({
        type: 'integer'
    })
    companyId: number;

    @Column({
        default: 'Default'
    })
    template: string;

    @Column({
        name: 'time_reservation',
        type: 'integer'
    })
    timeReservation: number;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated: Date;

    @ManyToOne(() => CompanyEntity, company => company.restaurants)
    company: CompanyEntity;

    @OneToMany(type => OrderEntity, order => order.restaurant)
    @JoinColumn()
    orders: OrderEntity[];

    @OneToMany(type => TableEntity, table => table.restaurant)
    @JoinColumn()
    tables: TableEntity[];

    @OneToMany(type => ReservationEntity, res => res.restaurant)
    @JoinColumn()
    reservations: ReservationEntity[];

    @ManyToOne(() => CategoryEntity, { cascade: true, eager: true })
    category: CategoryEntity;

    public setCompany(company: CompanyEntity): void {
        if (this.company === null) {
            this.company = company;

            company.addRestaurant(this);
        }
    }
}
