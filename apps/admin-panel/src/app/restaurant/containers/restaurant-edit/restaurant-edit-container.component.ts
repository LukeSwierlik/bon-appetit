import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonsState } from '../../../+state/commons/commons.reducer';
import { select, Store } from '@ngrx/store';
import { formQuery } from '../../../+state/commons/commons.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../+state';
import { AlertType } from '../../../components/alert/alert.component';
import { take } from 'rxjs/operators';
import { ResetForm } from '../../../+state/commons/commons.actions';
import { EditRestaurant } from '../../../+state/restaurants/restaurants.actions';
import { Restaurant } from '@bon-appetit/interfaces';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';
import { areasPoland } from 'apps/admin-panel/src/constans';

@Component({
    selector: 'tin-create-company-container',
    templateUrl: './restaurant-edit-container.component.html'
})
export class RestaurantEditContainerComponent implements OnInit {
    formStatus$: Observable<CommonsState> = this.store.pipe(select(formQuery.getForm));
    restaurant$: Observable<Restaurant> = this.store.pipe(select(restaurantsQuery.getRestaurant));
    editRestaurantForm: FormGroup;
    restaurant: Restaurant;

    readonly AlertType = AlertType;
    readonly areasPoland = areasPoland;

    constructor(private formBuilder: FormBuilder, private store: Store<State>) {}

    ngOnInit(): void {
        this.restaurant$.pipe(take(1)).subscribe(restaurant => {
            this.restaurant = restaurant;

            if (this.restaurant) {
                this.editRestaurantForm = this.formBuilder.group({
                    name: [this.restaurant.name, Validators.required],
                    email: [this.restaurant.email, [Validators.required, Validators.email]],
                    logoUrl: [
                        this.restaurant.logoUrl,
                        [
                            Validators.required,
                            Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')
                        ]
                    ],
                    heroUrl: [
                        this.restaurant.heroUrl,
                        [
                            Validators.required,
                            Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')
                        ]
                    ],
                    thumbnailUrl: [
                        this.restaurant.thumbnailUrl,
                        [
                            Validators.required,
                            Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')
                        ]
                    ],
                    city: [this.restaurant.city, Validators.required],
                    phoneNumber: [this.restaurant.phoneNumber, Validators.required],
                    street: [this.restaurant.street, Validators.required],
                    numberOfBuilding: [this.restaurant.numberOfBuilding, Validators.required],
                    postalCode: [this.restaurant.postalCode, Validators.required],
                    area: [this.restaurant.area, Validators.required],
                    websiteUrl: [this.restaurant.websiteUrl, Validators.required]
                });
            }
        });
    }

    onSubmit(): void {
        if (this.editRestaurantForm.valid) {
            this.store.dispatch(ResetForm());
            this.store.dispatch(
                EditRestaurant({
                    editRestaurant: {
                        ...this.editRestaurantForm.value,
                        id: this.restaurant.id
                    }
                })
            );
            // this.registerCompanyForm.reset();
        }
    }
}
