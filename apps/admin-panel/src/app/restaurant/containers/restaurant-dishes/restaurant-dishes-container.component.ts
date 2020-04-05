import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { dishesQuery } from '../../../+state/dishes/dishes.selectors';
import { Dish } from '@bon-appetit/interfaces';
import { AlertType } from '../../../components/alert/alert.component';
import { RemoveDish, SelectedDish } from '../../../+state/dishes/dishes.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'tin-restaurant-dishes',
    templateUrl: './restaurant-dishes-container.component.html'
})
export class RestaurantDishesContainerComponent {
    dishes$: Observable<Dish[]> = this.store.pipe(select(dishesQuery.getDishes));

    readonly AlertType = AlertType;

    constructor(private store: Store<State>,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    removeDish(dishId: number): void {
        this.store.dispatch(RemoveDish({ dishId }));
    }

    editDish(id: number): void {
        this.store.dispatch(SelectedDish({ id }));

        this.router.navigate(['../edit-dish'], {
            relativeTo: this.activatedRoute
        });
    }
}
