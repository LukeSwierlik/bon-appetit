import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTableDTO {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsInt()
    readonly maxPeopleCount: number;

    @IsInt()
    readonly restaurantId: number;
}
