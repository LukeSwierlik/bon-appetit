export interface CustomError {
    type: ErrorType;
    message: string;
}

export enum ErrorType {
    ERROR_FETCH_COMPANY,
    ERROR_CREATE_COMPANY,
    ERROR_LOAD_DISHES,
    ERROR_CREATE_DISH,
    ERROR_LOAD_EMPLOYEES,
    ERROR_CREATE_EMPLOYEE,
    ERROR_CREATE_TABLE,
    ERROR_LOAD_TABLES,
    ERROR_LOAD_TEMPLATES,
    ERROR_LOAD_RESTAURANTS,
    ERROR_CREATE_RESTAURANT,
    ERROR_EDIT_RESTAURANT,
    ERROR_REMOVE_RESTAURANT,
    ERROR_CREATE_USER,
    ERROR_LOGIN_USER,
    ERROR_LOAD_RESERVATIONS,
    ERROR_CREATE_RESERVATION,
}
