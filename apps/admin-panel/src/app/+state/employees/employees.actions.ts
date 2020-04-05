import { createAction, props } from '@ngrx/store';
import { AllEmployees, Employee } from '@bon-appetit/interfaces';

export const LoadEmployees = createAction('[Employees] Load Employees');
export const LoadEmployeesSuccess = createAction('[Employees] Load Employees Success', props<{ employees: AllEmployees[]; }>());

export const CreateEmployee = createAction('[Employees] Register Employee', props<{ createEmployee: Employee; }>());
export const CreateEmployeeSuccess = createAction('[Employees] Create Employee Success', props<{ employee: AllEmployees; }>());
