import { IsNotEmpty } from 'class-validator';

export class SearchDTO {
    @IsNotEmpty()
    readonly searchQuery: string;
}
