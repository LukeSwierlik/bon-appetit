import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '@bon-appetit/interfaces';
import { AddressEntity } from './addressEntity';

@Entity()
export abstract class PersonEntity extends AddressEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column({
        name: 'first_name'
    })
    firstName: string;

    @Column({
        name: 'last_name',
    })
    lastName: string;

    @Column()
    gender: string;

    @Column()
    email: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated: Date;
}
