import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { EmployeeEntity } from './employee.entity';
import { EmployeeController } from './employee.controller';
import { WaiterEntity } from './waiter.entity';
import { EmployeeService } from './employee.service';
import { DelivererEntity } from './deliverer.entity';
import { CookEntity } from './cook.entity';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { OwnerEntity } from './owner.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeEntity, WaiterEntity, DelivererEntity, CookEntity, UserEntity, OwnerEntity]), RestaurantModule],
    controllers: [EmployeeController],
    providers: [EmployeeService]
})
export class EmployeeModule {}
