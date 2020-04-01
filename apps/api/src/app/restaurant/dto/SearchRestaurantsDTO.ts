import { IsInt, IsNotEmpty } from 'class-validator';

export class SearchRestaurantsDTO {
    @IsInt()
    @IsNotEmpty()
    readonly companyId: number;
}
