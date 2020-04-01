import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
    @IsNotEmpty()
    readonly usernameCard: string;

    @IsNotEmpty()
    readonly numberCard: string;

    @IsNotEmpty()
    @IsInt()
    readonly expirationMonth: number;

    @IsNotEmpty()
    @IsInt()
    readonly expirationYear: number;

    @IsNotEmpty()
    readonly cvv: string;
}
