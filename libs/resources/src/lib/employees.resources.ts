import { EMPLOYEES_API } from './api';

export const EmployeesResources = {
    loadEmployees: (restaurantId: number) => `${EMPLOYEES_API}/load/${restaurantId}`,
    createEmployee: `${EMPLOYEES_API}/create`
};
