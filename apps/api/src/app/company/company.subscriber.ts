import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, Repository } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Injectable()
export class CompanySubscriber implements EntitySubscriberInterface<CompanyEntity> {
    constructor(
        @InjectConnection()
        readonly connection: Connection,
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return CompanyEntity;
    }

    async beforeInsert(event: InsertEvent<CompanyEntity>): Promise<void> {
        event.entity.created = new Date();
    };
}
