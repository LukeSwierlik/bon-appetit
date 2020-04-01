import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, Repository } from 'typeorm';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderSubscriber implements EntitySubscriberInterface<OrderEntity> {
    constructor(
        @InjectConnection()
        readonly connection: Connection,
        @InjectRepository(OrderEntity)
        private readonly dishRepository: Repository<OrderEntity>
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return OrderEntity;
    }

    async beforeInsert(event: InsertEvent<OrderEntity>): Promise<void> {
        event.entity.created = new Date();
    };
}
