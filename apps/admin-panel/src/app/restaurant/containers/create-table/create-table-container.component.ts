import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonsState } from '../../../+state/commons/commons.reducer';
import { select, Store } from '@ngrx/store';
import { formQuery } from '../../../+state/commons/commons.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../+state';
import { ResetForm } from '../../../+state/commons/commons.actions';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../components/alert/alert.component';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';
import { CreateTable } from '../../../+state/tables/tables.actions';

@Component({
    selector: 'tin-create-table',
    templateUrl: './create-table-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTableContainerComponent {
    formStatus$: Observable<CommonsState> = this.store.pipe(select(formQuery.getForm));
    selectedRestaurant$: Observable<number> = this.store.pipe(select(restaurantsQuery.getSelectedRestaurant));

    createTableForm: FormGroup;

    readonly AlertType = AlertType;

    constructor(private formBuilder: FormBuilder, private store: Store<State>) {
        this.createTableForm = this.formBuilder.group({
            name: ['', Validators.required],
            maxPeopleCount: [1, Validators.required]
        });
    }

    onSubmit(): void {
        if (this.createTableForm.valid) {
            this.store.dispatch(ResetForm());

            this.selectedRestaurant$.pipe(take(1)).subscribe(restaurantId => {
                this.store.dispatch(
                    CreateTable({
                        createTable: {
                            ...this.createTableForm.value,
                            restaurantId
                        }
                    })
                );

                // this.registerCompanyForm.reset();
            });
        }
    }
}
