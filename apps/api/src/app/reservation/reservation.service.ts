import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from './reservation.entity';
import { CreateReservationDTO } from './dto/CreateReservationDTO';
import { ReservationStatus } from '@bon-appetit/interfaces';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(ReservationEntity)
        private readonly reservationsRepository: Repository<ReservationEntity>,
    ) {
    }

    async createReservation(createReservationDTO: CreateReservationDTO): Promise<ReservationEntity | undefined> {
        return this.reservationsRepository.save(createReservationDTO);
    }

    async loadReservationRestaurant(restaurantId: number): Promise<ReservationEntity[] | undefined> {
        const reservationEntities = await this.reservationsRepository.find({ restaurantId });
        const ids = reservationEntities.map(res => res.id);

        return this.reservationsRepository.findByIds(ids, {
            relations: ['table', 'user']
        });
    }

    async loadReservationUser(userId: number): Promise<ReservationEntity[] | undefined> {
        const reservationEntities = await this.reservationsRepository.find({ userId });
        const ids = reservationEntities.map(res => res.id);

        return this.reservationsRepository.findByIds(ids, {
            relations: ['table', 'restaurant']
        });
    }

    async changeReservationStatus(id: number, status: ReservationStatus): Promise<any> {
        return this.reservationsRepository.update(id, {
            status
        });
    }
}
