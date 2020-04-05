import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Table } from '@bon-appetit/interfaces';
import { TablesResources } from '@bon-appetit/resources';

@Injectable({
    providedIn: 'root'
})
export class TablesService {
    constructor(private httpClient: HttpClient) {}

    loadTables(restaurantId: number): Observable<any> {
        return this.httpClient.get(TablesResources.loadTables(restaurantId));
    }

    createTable(createTable: Table): Observable<any> {
        return this.httpClient.post(TablesResources.createTables, createTable);
    }
}
