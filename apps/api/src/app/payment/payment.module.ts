import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { PaymentEntity } from './payment.entity';
import { PaymentSubscriber } from './payment.subscriber';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentEntity, UserEntity])],
    providers: [PaymentSubscriber],
})
export class PaymentModule {}
