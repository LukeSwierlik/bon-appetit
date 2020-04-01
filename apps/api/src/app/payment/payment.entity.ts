import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('payment')
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'username_card'
    })
    usernameCard: string;

    @Column({
        name: 'number_card'
    })
    numberCard: string;

    @Column({
        name: 'expiration_month',
        type: 'integer',
    })
    expirationMonth: number;

    @Column({
        name: 'expiration_year',
        type: 'integer',
    })
    expirationYear: number;

    @Column()
    cvv: string;
}
