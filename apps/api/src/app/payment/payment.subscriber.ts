import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentSubscriber implements EntitySubscriberInterface<PaymentEntity> {
    constructor(
        @InjectConnection()
        readonly connection: Connection,
        @InjectRepository(PaymentEntity)
        private readonly usersRepository: Repository<PaymentEntity>
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return PaymentEntity;
    }

    async beforeInsert(event: InsertEvent<PaymentEntity>): Promise<void> {
        event.entity.cvv = await bcrypt.hash(event.entity.cvv, 10);
    };
}
