import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient) {
    }

    createUser(payload: any): Observable<any> {
        return this.httpClient.post('http://localhost:3333/api/user/register', payload);
    }

    loginUser(payload: any): Observable<any> {
        return this.httpClient.post('http://localhost:3333/api/user/login', {...payload.form});
    }
}
