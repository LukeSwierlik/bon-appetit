export interface User {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: Gender;
    email: string;
    street: string;
    city: string;
    numberOfBuilding: string;
    postalCode: string;
    country: string;
    type: UserType;
    userType: Directory;
    payment?: Payment;
    restaurantId?: number;
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

export interface Month {
    id: number;
    name: string;
}

export interface Payment {
    cvv: number;
    numberCard: string;
    usernameCard: string;
    expirationMonth: number;
    expirationYear: number;
}

export enum UserType {
    USER = 'UserEntity',
    EMPLOYEE = 'EmployeeEntity',
    WAITER = 'WaiterEntity',
    COOK = 'CookEntity',
    DELIVERER = 'DelivererEntity',
    OWNER = 'OwnerEntity'
}

export interface Directory {
    id: number;
    name: UserType;
}
