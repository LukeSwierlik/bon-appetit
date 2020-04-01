import { IsInt, IsNotEmpty } from 'class-validator';

export class PayOrdersDto {
    @IsNotEmpty()
    @IsInt()
    readonly id: number;

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
