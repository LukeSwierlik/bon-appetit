import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonsState } from '../../../+state/commons/commons.reducer';
import { select, Store } from '@ngrx/store';
import { formQuery } from '../../../+state/commons/commons.selectors';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../+state';
import { ResetForm } from '../../../+state/commons/commons.actions';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../components/alert/alert.component';
import { Template } from '@bon-appetit/interfaces';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';
import { dishesQuery } from '../../../+state/dishes/dishes.selectors';
import { CreateDish } from '../../../+state/dishes/dishes.actions';

@Component({
    selector: 'tin-create-dish',
    templateUrl: './create-dish-container.component.html'
})
export class CreateDishContainerComponent {
    formStatus$: Observable<CommonsState> = this.store.pipe(select(formQuery.getForm));
    selectedRestaurant$: Observable<number> = this.store.pipe(select(restaurantsQuery.getSelectedRestaurant));
    templates$: Observable<Template[]> = this.store.pipe(select(dishesQuery.getTemplates));

    createDishForm: FormGroup;
    ingredients: FormArray;

    readonly AlertType = AlertType;

    constructor(private formBuilder: FormBuilder, private store: Store<State>) {
        this.createDishForm = this.formBuilder.group({
            name: ['', Validators.required],
            imageUrl: [
                '',
                [Validators.required, Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')]
            ],
            price: ['', Validators.required],
            ingredients: this.formBuilder.array([this.createItem()]),
            template: ['Default', Validators.required]
        });

        this.ingredients = this.createDishForm.get('ingredients') as FormArray;
    }

    createItem(): FormGroup {
        return this.formBuilder.group({
            name: ''
        });
    }

    addIngredients(): void {
        this.ingredients.push(this.createItem());
    }

    removeIngredients(): void {
        this.ingredients.removeAt(this.ingredients.length - 1);
    }

    onSubmit(): void {
        if (this.createDishForm.valid) {
            this.store.dispatch(ResetForm());

            this.selectedRestaurant$.pipe(take(1)).subscribe(restaurantId => {
                this.store.dispatch(
                    CreateDish({
                        createDish: {
                            ...this.createDishForm.value,
                            restaurantId
                        }
                    })
                );

                // this.registerCompanyForm.reset();
            });
        }
    }
}
