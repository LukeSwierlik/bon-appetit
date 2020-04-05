import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyResource } from '@bon-appetit/resources';

@Injectable({
    providedIn: 'root'
})
export class CompaniesService {
    constructor(private httpClient: HttpClient) {}

    getCompanies(): Observable<any> {
        return this.httpClient.get(CompanyResource.loadCompanies);
    }

    searchCompanies(searchQuery: string): Observable<any> {
        return this.httpClient.post(`http://localhost:3333/api/company/search`, {
            searchQuery
        });
    }
}
