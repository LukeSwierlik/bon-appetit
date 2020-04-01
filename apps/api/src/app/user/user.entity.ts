import { Column, Entity, JoinColumn, OneToMany, OneToOne, TableInheritance } from 'typeorm';
import { PersonEntity } from '../person/person.entity';
import { ReservationEntity } from '../reservation/reservation.entity';
import { CompanyEntity } from '../company/company.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { OrderEntity } from '../order/order.entity';

@Entity('user')
@TableInheritance({ column: { type: 'varchar', name: 'type', default: 'employee' } })
export class UserEntity extends PersonEntity {
    company: CompanyEntity;

    @OneToMany(type => ReservationEntity, reservation => reservation.user)
    @JoinColumn()
    reservations: ReservationEntity[];

    @OneToMany(type => OrderEntity, order => order.user)
    @JoinColumn()
    orders: OrderEntity[];

    @OneToOne(type => PaymentEntity, { cascade: true, eager: true, nullable: true })
    @JoinColumn()
    payment: PaymentEntity;

    @Column()
    type: string;
}
