import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RestaurantEntity } from './restaurant/restaurant.entity';
import { DishEntity } from './dish/dish.entity';
import { IngredientEntity } from './ingredient/ingredient.entity';
import { OrderEntity } from './order/order.entity';
import { OrderModule } from './order/order.module';
import { CompanyEntity } from './company/company.entity';
import { TableEntity } from './table/table.entity';
import { ReservationEntity } from './reservation/reservation.entity';
import { EmployeeEntity } from './employee/employee.entity';
import { EmployeeModule } from './employee/employee.module';
import { WaiterEntity } from './employee/waiter.entity';
import { CookEntity } from './employee/cook.entity';
import { DelivererEntity } from './employee/deliverer.entity';
import { CompanyModule } from './company/company.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentEntity } from './payment/payment.entity';
import { DishModule } from './dish/dish.module';
import { OwnerEntity } from './employee/owner.entity';
import { TableModule } from './table/table.module';
import { ReservationModule } from './reservation/reservation.module';
import { CategoryEntity } from './category/category.entity';
import { CategoryModule } from './category/category.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'holy1593',
            database: 'tin',
            entities: [RestaurantEntity, UserEntity, DishEntity, IngredientEntity, OrderEntity, CompanyEntity, TableEntity, ReservationEntity, EmployeeEntity, WaiterEntity, CookEntity, DelivererEntity, PaymentEntity, OwnerEntity, CategoryEntity],
            synchronize: true,
            subscribers: ['src/**/**.subscriber.ts'],
            logging: false,
        }),
        UserModule,
        RestaurantModule,
        OrderModule,
        EmployeeModule,
        CompanyModule,
        PaymentModule,
        DishModule,
        TableModule,
        ReservationModule,
        CategoryModule,
    ]
})
export class AppModule {}

