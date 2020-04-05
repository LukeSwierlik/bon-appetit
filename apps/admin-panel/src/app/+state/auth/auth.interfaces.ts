import { Gender, UserType } from '@bon-appetit/interfaces';

export interface FormRegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    street: string;
    numberOfBuilding: string;
    postalCode: string;
    phoneNumber: string;
    country: string;
    gender: Gender;
}

export interface FormLoginUser {
    email: string;
    password?: string;
}

export interface CreateEmployee {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    street: string;
    numberOfBuilding: string;
    postalCode: string;
    phoneNumber: string;
    country: string;
    gender: Gender;
    type: UserType;
    ratePerHours?: number;
    restaurantId?: number;
}
