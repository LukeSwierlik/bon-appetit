import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, Repository } from 'typeorm';
import { DishEntity } from './dish.entity';

@Injectable()
export class DishSubscriber implements EntitySubscriberInterface<DishEntity> {
    constructor(
        @InjectConnection()
        readonly connection: Connection,
        @InjectRepository(DishEntity)
        private readonly dishRepository: Repository<DishEntity>
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return DishEntity;
    }

    async beforeInsert(event: InsertEvent<DishEntity>): Promise<void> {
        event.entity.created = new Date();
    };
}
