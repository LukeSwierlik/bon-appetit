import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/user.entity';
import { OrderSubscriber } from './order.subscriber';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity]), RestaurantModule, UserModule],
    controllers: [OrderController],
    providers: [OrderService, OrderSubscriber]
})
export class OrderModule {}
