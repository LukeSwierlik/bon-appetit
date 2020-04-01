import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DishEntity } from '../dish/dish.entity';

@Entity('ingredient')
export class IngredientEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => DishEntity, dish => dish.ingredients, { onDelete: 'CASCADE' })
    dish: Promise<DishEntity>;

    constructor(name: string) {
        this.name = name;
    }
}

