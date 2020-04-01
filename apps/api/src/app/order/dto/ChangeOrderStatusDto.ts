import { IsInt, IsNotEmpty } from 'class-validator';

export class ChangeOrderStatusDto {
    @IsNotEmpty()
    @IsInt()
    readonly id: number;

    @IsNotEmpty()
    readonly status: string;
}
