import { IsInt, IsNotEmpty } from 'class-validator';

export class AddNewOrderDto {
    @IsNotEmpty()
    @IsInt()
    readonly count: number;

    @IsNotEmpty()
    @IsInt()
    readonly dishId: number;

    @IsNotEmpty()
    @IsInt()
    readonly restaurantId: number;

    @IsNotEmpty()
    @IsInt()
    readonly userId: number;
}
