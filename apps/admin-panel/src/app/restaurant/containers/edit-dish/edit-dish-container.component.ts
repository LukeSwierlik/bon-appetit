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
import { Dish, Ingredient, Template } from '@bon-appetit/interfaces';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';
import { dishesQuery } from '../../../+state/dishes/dishes.selectors';
import { CreateDish, EditDish } from '../../../+state/dishes/dishes.actions';

@Component({
    selector: 'tin-edit-dish',
    templateUrl: './edit-dish-container.component.html'
})
export class EditDishContainerComponent {
    formStatus$: Observable<CommonsState> = this.store.pipe(select(formQuery.getForm));
    selectedDish$: Observable<Dish> = this.store.pipe(select(dishesQuery.getSelectedDish));
    templates$: Observable<Template[]> = this.store.pipe(select(dishesQuery.getTemplates));

    editDishForm: FormGroup;
    ingredients: FormArray;
    dish: Dish;

    readonly AlertType = AlertType;

    constructor(private formBuilder: FormBuilder, private store: Store<State>) {
        this.selectedDish$
            .pipe(take(1))
            .subscribe(dish => {
                this.dish = dish;

                const [firstIngredient, ...rest] = dish.ingredients;

                this.editDishForm = this.formBuilder.group({
                    name: [dish.name, Validators.required],
                    imageUrl: [
                        dish.imageUrl,
                        [Validators.required, Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')]
                    ],
                    price: [dish.price, Validators.required],
                    ingredients: this.formBuilder.array([this.createItem(firstIngredient.name)]),
                    template: [dish.template, Validators.required]
                });

                this.ingredients = this.editDishForm.get('ingredients') as FormArray;

                this.initialIngredients(rest);
            });
    }

    initialIngredients(ingredients: Ingredient[]): void {
        ingredients.map(ingredient => {
            this.ingredients.push(this.formBuilder.group({
                name: ingredient.name
            }))
        });
    }

    createItem(ingredient: string = ''): FormGroup {
        return this.formBuilder.group({
            name: ingredient
        });
    }

    addIngredients(): void {
        this.ingredients.push(this.createItem());
    }

    removeIngredients(): void {
        this.ingredients.removeAt(this.ingredients.length - 1);
    }

    onSubmit(): void {

        if (this.editDishForm.valid) {
            this.store.dispatch(ResetForm());

            this.store.dispatch(EditDish({
                editDish: {
                    ...this.dish,
                    ...this.editDishForm.value
                }
            }));

            // this.selectedRestaurant$.pipe(take(1)).subscribe(restaurantId => {
            //     this.store.dispatch(
            //         CreateDish({
            //             createDish: {
            //                 ...this.createDishForm.value,
            //                 restaurantId
            //             }
            //         })
            //     );
            //
            //     // this.registerCompanyForm.reset();
            // });
        }
    }
}
