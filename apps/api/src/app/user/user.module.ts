import { Module } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSubscriber } from './user.subscriber';
import { PaymentEntity } from '../payment/payment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, PaymentEntity])],
    controllers: [UserController],
    providers: [UserService, UserSubscriber],
    exports: [UserService],
})
export class UserModule {}
