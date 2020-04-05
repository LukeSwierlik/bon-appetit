import { User } from '@bon-appetit/interfaces';

export interface Employee extends User {
    hoursWorked: string;
    ratePerHour: number;
}

export interface Deliverer extends Employee {
    countOfDelivers: number;
    salaryAllowanceForDelivery: number;
}

export interface Waiter extends Employee {
    countOfOvertime: number;
    salaryAllowanceForOvertime: number;
}

export interface Cook extends Employee {
    countOfDish: number;
    salaryAllowanceForDish: number;
}

export type AllEmployees = Deliverer | Waiter | Cook;
