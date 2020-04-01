import { Injectable } from '@nestjs/common';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DishEntity } from './dish.entity';
import { CreateDishDto } from './dto/CreateDishDto';
import { IngredientEntity } from '../ingredient/ingredient.entity';
import { LoadDishesDTO } from './dto/LoadDishesDTO';
import { EditDishDto } from './dto/EditDishDto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class DishService {
    constructor(@InjectRepository(DishEntity)
                private readonly dishRepository: Repository<DishEntity>
    ) {}

    async createDish(createDishDto: CreateDishDto): Promise<DishEntity> {
        const { ingredients, ...dish } = createDishDto;
        const dishEntity = new DishEntity(dish.name, dish.price, dish.imageUrl, dish.companyId, dish.template);

        ingredients.forEach(ingredient => {
            const ingredientEntity = new IngredientEntity(ingredient.name);

            dishEntity.addIngredient(ingredientEntity);
        });

        return this.dishRepository.save(dishEntity);
    }

    @Transaction()
    async editDish(editDish: EditDishDto,
                   @TransactionRepository(DishEntity) dishEntity: Repository<DishEntity>,
                   ): Promise<any> {
        const { id, ...editDishProps } = editDish;


        //remove
        const dishEntityOld = await dishEntity.findOne({ id });
        const removeDish = await dishEntity.remove(dishEntityOld);


        //create
        const { ingredients, ...dish } = editDishProps;
        const dishEntityCreate = new DishEntity(dish.name, dish.price, dish.imageUrl, dish.companyId, dish.template);

        ingredients.forEach(ingredient => {
            const ingredientEntity = new IngredientEntity(ingredient.name);

            dishEntityCreate.addIngredient(ingredientEntity);
        });

        const results = await dishEntity.save(dishEntityCreate);

        return results;
    }

    async removeDish(id: number): Promise<any> {
        const dishEntity = await this.dishRepository.findOne({ id });
        const dish = await this.dishRepository.remove(dishEntity);

        return dish;
    }

    async loadDishes(loadDishesDTO: LoadDishesDTO): Promise<DishEntity[] | undefined> {
        return await this.dishRepository.find({ ...loadDishesDTO });
    }

}
