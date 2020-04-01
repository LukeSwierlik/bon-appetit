import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
    constructor(
        @InjectConnection()
        readonly connection: Connection,
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return UserEntity;
    }

    async beforeInsert(event: InsertEvent<UserEntity>): Promise<void> {
        event.entity.password = await bcrypt.hash(event.entity.password, 10);
        event.entity.created = new Date();
    };
}
