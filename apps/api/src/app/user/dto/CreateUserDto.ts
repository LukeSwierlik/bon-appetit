import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from '@bon-appetit/interfaces';

export class CreateUserDto {
    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly city: string;

    @IsNotEmpty()
    readonly country: string;

    @IsEnum(Gender)
    readonly gender: Gender;

    @IsNotEmpty()
    readonly numberOfBuilding: string;

    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsNotEmpty()
    readonly postalCode: string;

    @IsNotEmpty()
    readonly street: string;

    @IsNotEmpty()
    readonly area: string;
}
