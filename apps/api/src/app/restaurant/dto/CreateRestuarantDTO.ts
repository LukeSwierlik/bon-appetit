import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class CreateRestaurantDTO {
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly websiteUrl: string;

    @IsNotEmpty()
    readonly logoUrl: string;

    @IsNotEmpty()
    readonly heroUrl: string;

    @IsNotEmpty()
    readonly thumbnailUrl: string;

    @IsNotEmpty()
    readonly city: string;

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

    @IsInt()
    @IsNotEmpty()
    readonly ownerId: number;

    @IsNotEmpty()
    readonly template: string;
}
