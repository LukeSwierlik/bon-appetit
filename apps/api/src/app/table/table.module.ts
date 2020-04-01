import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './table.entity';
import { ReservationEntity } from '../reservation/reservation.entity';
import { TableService } from './table.service';
import { TableController } from './table.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TableEntity, ReservationEntity])],
    controllers: [TableController],
    providers: [TableService]
})
export class TableModule {}
