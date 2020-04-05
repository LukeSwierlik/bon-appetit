import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '@bon-appetit/interfaces';

@Injectable({
    providedIn: 'root'
})
export class RestaurantsService {
    constructor(private httpClient: HttpClient) {}

    getRestaurants(): Observable<any> {
        return this.httpClient.get('http://localhost:3333/api/restaurants');
    }

    getRestaurant(id: string): Observable<any> {
        return this.httpClient.get(`http://localhost:3333/api/restaurants/${id}`);
    }

    create(restaurant: Restaurant): Observable<any> {
        return this.httpClient.post(`http://localhost:3333/api/restaurants/create`, restaurant);
    }

    edit(restaurant: Restaurant): Observable<any> {
        return this.httpClient.put(`http://localhost:3333/api/restaurants/edit`, restaurant);
    }

    remove(id: number): Observable<any> {
        return this.httpClient.delete(`http://localhost:3333/api/restaurants/remove/${id}`);
    }

    loadCategories(): Observable<any> {
        return this.httpClient.get('http://localhost:3333/api/category/');
    }

    searchRestaurant(searchQuery: string): Observable<any> {
        return this.httpClient.post(`http://localhost:3333/api/restaurants/search`, {
            searchQuery
        });
    }

    searchRestaurantCompany(companyId: number): Observable<any> {
        return this.httpClient.post(`http://localhost:3333/api/restaurants/search-restaurants`, {
            companyId
        });
    }
}
