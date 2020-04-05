import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '@bon-appetit/interfaces';
import { DishesResource } from '@bon-appetit/resources';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
    constructor(private httpClient: HttpClient) { }

    loadDishes(companyId: number, template: string): Observable<any> {
        return this.httpClient.post(DishesResource.loadDishes, {
            companyId,
            template
        });
    }

    createDish(dish: Dish): Observable<any> {
        return this.httpClient.post(DishesResource.createDish, dish);
    }

    loadTemplates(companyId: number): Observable<any> {
        return this.httpClient.get(DishesResource.loadTemplates(companyId));
    }

    removeDish(dishId: number): Observable<any> {
        return this.httpClient.delete(DishesResource.removeDish(dishId));
    }

    editDish(dish: Dish): Observable<any> {

        return this.httpClient.post(DishesResource.editDish, dish);
    }
}
