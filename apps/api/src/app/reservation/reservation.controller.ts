import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDTO } from './dto/CreateReservationDTO';

@Controller('reservations')
export class ReservationController {
    constructor(private reservationService: ReservationService) {
    }

    @Post('/create')
    async createReservation(@Res() res, @Body() createReservationDTO: CreateReservationDTO) {
        const reservation = await this.reservationService.createReservation(createReservationDTO);

        return res.status(HttpStatus.OK).json(reservation);
    }

    @Post('/users')
    async loadReservationsUser(@Res() res, @Body() body) {
        const { userId } = body;

        console.log('userID', userId);

        const reservations = await this.reservationService.loadReservationUser(userId);

        return res.status(HttpStatus.OK).json(reservations);
    }

    @Post('/restaurant')
    async loadReservationsRestaurant(@Res() res, @Body() body) {
        const { restaurantId } = body;

        const reservations = await this.reservationService.loadReservationRestaurant(restaurantId);

        return res.status(HttpStatus.OK).json(reservations);
    }

    @Post('/change-status')
    async changeReservationStatus(@Res() res, @Body() body) {
        const {reservationId, reservationStatus } = body;

        const reservation = await this.reservationService.changeReservationStatus(reservationId, reservationStatus);

        return res.status(HttpStatus.OK).json(reservation);
    }
}
