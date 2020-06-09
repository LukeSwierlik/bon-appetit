import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonsState } from '../../../+state/commons/commons.reducer';
import { select, Store } from '@ngrx/store';
import { formQuery } from '../../../+state/commons/commons.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../+state';
import { AlertType } from '../../../components/alert/alert.component';
import { take } from 'rxjs/operators';
import { ResetForm } from '../../../+state/commons/commons.actions';
import { CreateRestaurant } from '../../../+state/restaurants/restaurants.actions';
import { companyQuery } from '../../../+state/company/company.selectors';
import { termsAndConditionals, areasPoland } from 'apps/admin-panel/src/constans';

@Component({
    selector: 'tin-create-company-container',
    templateUrl: './create-restaurant-container.component.html'
})
export class CreateRestaurantContainerComponent {
    formStatus$: Observable<CommonsState> = this.store.pipe(select(formQuery.getForm));
    companyId$: Observable<number> = this.store.pipe(select(companyQuery.getCompanyId));
    registerRestaurantForm: FormGroup;

    openedModal = false;

    readonly AlertType = AlertType;
    readonly termsAndConditionals = termsAndConditionals;
    readonly areasPoland = areasPoland;

    constructor(private formBuilder: FormBuilder, private store: Store<State>) {
        this.registerRestaurantForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            logoUrl: ['', [Validators.required, Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')]],
            heroUrl: ['', [Validators.required, Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')]],
            thumbnailUrl: ['', [Validators.required, Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')]],
            terms: [false, Validators.required],
            city: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            street: ['', Validators.required],
            numberOfBuilding: ['', Validators.required],
            postalCode: ['', Validators.required],
            area: ['Wybierz...', Validators.required],
            websiteUrl: ['', Validators.required],
            template: ['Default', Validators.required],
            timeReservation: [0, Validators.required],
        });
    }

    onSubmit(): void {
        if (this.registerRestaurantForm.valid) {
            this.store.dispatch(ResetForm());

            this.companyId$.pipe(
                take(1)
            )
            .subscribe(companyId => {
                this.store.dispatch(CreateRestaurant({
                    createRestaurant: {
                        ...this.registerRestaurantForm.value,
                        companyId
                    }
                }));
            });
        }
    }

    showModal(): void {
        this.openedModal = !this.openedModal;
    }
}
