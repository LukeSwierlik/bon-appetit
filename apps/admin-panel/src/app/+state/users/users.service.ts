import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private httpClient: HttpClient) {}

    getUsers(): Observable<any> {
        return this.httpClient.get('http://localhost:3333/api/user');
    }

    getSearchUsers(searchQuery: string): Observable<any> {
        return this.httpClient.get(`http://localhost:3333/api/user/${searchQuery}`);
    }
}
