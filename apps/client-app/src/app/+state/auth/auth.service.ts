import axios from 'axios';
import { Gender } from '@bon-appetit/interfaces';
import { AuthResource } from '@bon-appetit/resources';

interface Login {
    email: string;
    password: string;
}

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

export const loginUser = (payload: Login) => axios.post(AuthResource.login, payload);

export const registerUser = (payload: FormRegisterUser) => axios.post(AuthResource.createUser, payload);
