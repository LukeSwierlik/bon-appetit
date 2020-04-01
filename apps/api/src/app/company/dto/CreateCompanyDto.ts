import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly imageUrl: string;

    @IsNotEmpty()
    readonly city: string;

    @IsNotEmpty()
    readonly country: string;

    @IsNotEmpty()
    readonly numberOfBuilding: string;

    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsNotEmpty()
    readonly postalCode: string;

    @IsNotEmpty()
    readonly street: string;

    @IsInt()
    @IsNotEmpty()
    readonly ownerId: number;
}
