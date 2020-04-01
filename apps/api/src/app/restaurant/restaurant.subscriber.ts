import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, Repository } from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

@Injectable()
export class RestaurantSubscriber implements EntitySubscriberInterface<RestaurantEntity> {
    constructor(
        @InjectConnection()
        readonly connection: Connection,
        @InjectRepository(RestaurantEntity)
        private readonly restaurantRepository: Repository<RestaurantEntity>
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return RestaurantEntity;
    }

    async beforeInsert(event: InsertEvent<RestaurantEntity>): Promise<void> {
        event.entity.created = new Date();
    };
}
