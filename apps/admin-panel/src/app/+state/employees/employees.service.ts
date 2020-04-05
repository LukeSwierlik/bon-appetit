import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '@bon-appetit/interfaces';
import { EmployeesResources } from '@bon-appetit/resources';

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {
    constructor(private httpClient: HttpClient) {}

    loadEmployees(restaurantId: number): Observable<any> {
        return this.httpClient.get(EmployeesResources.loadEmployees(restaurantId))
    }

    createEmployee(employee: Employee): Observable<any> {
        return this.httpClient.post(EmployeesResources.createEmployee, employee);
    }
}
