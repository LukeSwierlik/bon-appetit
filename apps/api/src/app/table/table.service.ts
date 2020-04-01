import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableEntity } from './table.entity';
import { Repository } from 'typeorm';
import { CreateTableDTO } from './dto/CreateTableDTO';

@Injectable()
export class TableService {
    constructor(@InjectRepository(TableEntity)
                private readonly tableRepository: Repository<TableEntity>) {
    }

    async createTable(createTableDTO: CreateTableDTO): Promise<TableEntity | undefined> {
        return this.tableRepository.save(createTableDTO);
    }

    async loadTables(restaurantId: number): Promise<TableEntity[] | undefined> {
        return this.tableRepository.find({ restaurantId });
    }
}
