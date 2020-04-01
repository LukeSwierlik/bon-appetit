import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discount')
export class DiscountEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'integer'
    })
    amount: number;
}
