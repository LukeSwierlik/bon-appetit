import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './reservation.entity';
import { UserEntity } from '../user/user.entity';
import { TableEntity } from '../table/table.entity';
import { ReservationController } from './reservation.controller';
import { ReservationSubscriber } from './reservation.subscriber';
import { ReservationService } from './reservation.service';
import { RestaurantEntity } from '../restaurant/restaurant.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationEntity, UserEntity, TableEntity, RestaurantEntity])],
    controllers: [ReservationController],
    providers: [ReservationService, ReservationSubscriber],
    exports: [TypeOrmModule.forFeature([ReservationEntity])],
})
export class ReservationModule {}
