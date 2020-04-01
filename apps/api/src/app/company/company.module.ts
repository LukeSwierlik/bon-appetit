import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { UserEntity } from '../user/user.entity';
import { CompanySubscriber } from './company.subscriber';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyEntity, RestaurantEntity, UserEntity])],
    controllers: [CompanyController],
    providers: [CompanyService, CompanySubscriber],
    exports: [TypeOrmModule.forFeature([CompanyEntity])],
})
export class CompanyModule {}
