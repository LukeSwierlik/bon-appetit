import { IsInt, IsNotEmpty } from 'class-validator';

export class LoadDishesDTO {
    @IsNotEmpty()
    @IsInt()
    readonly companyId: number;

    @IsNotEmpty()
    readonly template: string;
}
