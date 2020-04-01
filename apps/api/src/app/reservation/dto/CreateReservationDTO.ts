import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateReservationDTO {
    @IsNotEmpty()
    @IsInt()
    readonly tableId: number;

    @IsNotEmpty()
    hour: string;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    @IsInt()
    peopleCount: number;

    @IsNotEmpty()
    @IsInt()
    restaurantId: number;

    @IsNotEmpty()
    @IsInt()
    userId: number;
}
