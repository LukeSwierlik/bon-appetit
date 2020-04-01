import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { IngredientEntity } from '../ingredient/ingredient.entity';
import { DishEntity } from './dish.entity';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { DishSubscriber } from './dish.subscriber';

@Module({
    imports: [TypeOrmModule.forFeature([DishEntity, RestaurantEntity, IngredientEntity])],
    controllers: [DishController],
    providers: [DishService, DishSubscriber],
    exports: [TypeOrmModule.forFeature([DishEntity])],
})
export class DishModule {}
