import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, Repository } from 'typeorm';
import { ReservationEntity } from './reservation.entity';

@Injectable()
export class ReservationSubscriber implements EntitySubscriberInterface<ReservationEntity> {
    constructor(
        @InjectConnection()
        readonly connection: Connection,
        @InjectRepository(ReservationEntity)
        private readonly reservationRepository: Repository<ReservationEntity>
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return ReservationEntity;
    }

    async beforeInsert(event: InsertEvent<ReservationEntity>): Promise<void> {
        event.entity.created = new Date();
    };
}
