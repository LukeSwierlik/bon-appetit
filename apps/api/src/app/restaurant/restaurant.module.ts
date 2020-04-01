import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { DishEntity } from '../dish/dish.entity';
import { IngredientEntity } from '../ingredient/ingredient.entity';
import { OrderEntity } from '../order/order.entity';
import { CompanyEntity } from '../company/company.entity';
import { RestaurantSubscriber } from './restaurant.subscriber';
import { CategoryEntity } from '../category/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RestaurantEntity, DishEntity, IngredientEntity, OrderEntity, CompanyEntity, CategoryEntity])],
    controllers: [RestaurantController],
    providers: [RestaurantService, RestaurantSubscriber],
    exports: [TypeOrmModule.forFeature([RestaurantEntity])],
})
export class RestaurantModule {}
