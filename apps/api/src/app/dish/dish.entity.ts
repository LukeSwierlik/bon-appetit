import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IngredientEntity } from '../ingredient/ingredient.entity';
import { OrderEntity } from '../order/order.entity';

@Entity('dish')
export class DishEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'double'
    })
    price: number;

    @Column({
        name: 'image_url'
    })
    imageUrl: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated: Date;

    @Column({
        type: 'integer'
    })
    companyId: number;

    @Column({
        default: 'Default'
    })
    template: string;

    @OneToMany(() => IngredientEntity, ingredient => ingredient.dish, { cascade: true, eager: true })
    ingredients: IngredientEntity[];

    @OneToMany(() => OrderEntity, order => order.dish)
    orders: OrderEntity[];

    constructor(name: string, price: number, imageUrl: string, companyId: number, template: string) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.companyId = companyId;
        this.template = template;
    }

    addIngredient(ingredient: IngredientEntity): void {
        if (!this.ingredients) {
            this.ingredients = [];
        }

        this.ingredients.push(ingredient);
    }

}

