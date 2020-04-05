import { IsArray, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Ingredient } from '@bon-appetit/interfaces';


export class CreateDishDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly imageUrl: string;

    @IsArray()
    @IsNotEmpty()
    readonly ingredients: Ingredient[];

    @IsNotEmpty()
    readonly template: string;

    @IsNotEmpty()
    @IsInt()
    readonly companyId: number;
}
