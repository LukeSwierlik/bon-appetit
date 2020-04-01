import { Column, Entity } from 'typeorm';

@Entity()
export abstract class AddressEntity {
    @Column()
    street: string;

    @Column()
    city: string;

    @Column({
        name: 'number_of_building'
    })
    numberOfBuilding: string;

    @Column({
        name: 'postal_code'
    })
    postalCode: string;

    @Column({
        default: 'Polska'
    })
    country: string;

    @Column()
    area: string;

    @Column({
        name: 'phone_number'
    })
    phoneNumber: string;
}
