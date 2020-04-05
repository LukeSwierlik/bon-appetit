import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '@bon-appetit/interfaces';
import { CompanyResource } from '@bon-appetit/resources';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    constructor(private httpClient: HttpClient) {}

    getCompany(ownerId: number): Observable<any> {
        return this.httpClient.post(CompanyResource.loadCompany, {
            ownerId
        });
    }

    createCompany(createCompany: Company): Observable<any> {
        return this.httpClient.post(CompanyResource.createCompany, createCompany);
    }
}
