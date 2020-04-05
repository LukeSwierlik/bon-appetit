import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category, Restaurant } from '@bon-appetit/interfaces';
import { AlertType } from '../alert/alert.component';
import { Store } from '@ngrx/store';
import { State } from '../../+state';
import { FilterCategories } from '../../+state/restaurants/restaurants.actions';

@Component({
    selector: 'tin-products',
    templateUrl: './products.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
    @Input() restaurants: Restaurant[];
    @Input() categories: Category[];

    readonly AlertType = AlertType;

    constructor(private store: Store<State>) {
    }

    filter(event) {
        this.store.dispatch(FilterCategories({ categoryId: parseInt(event, 10)}))
    }

    resetFilter() {
        this.store.dispatch(FilterCategories({ categoryId: 0 }))
    }
}
