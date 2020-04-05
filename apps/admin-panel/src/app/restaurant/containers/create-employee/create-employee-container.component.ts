import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { Gender } from '@bon-appetit/interfaces';
import { CommonsState } from '../../../+state/commons/commons.reducer';
import { formQuery } from '../../../+state/commons/commons.selectors';
import { Observable } from 'rxjs';
import { termsAndConditionals, areasPoland, months, employeeTypes } from '../../../../constans';
import { ResetForm } from '../../../+state/commons/commons.actions';
import { AlertType } from '../../../components/alert/alert.component';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';
import { CreateEmployee } from '../../../+state/employees/employees.actions';

@Component({
    selector: 'tin-register',
    templateUrl: './create-employee-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEmployeeContainerComponent {
    formStatus$: Observable<CommonsState> = this.store.pipe(select(formQuery.getForm));
    selectedRestaurant$: Observable<number> = this.store.pipe(select(restaurantsQuery.getSelectedRestaurant));
    registerForm: FormGroup;

    openedModal = false;

    readonly Gender = Gender;
    readonly AlertType = AlertType;
    readonly termsAndConditionals = termsAndConditionals;
    readonly areasPoland = areasPoland;
    readonly employeeTypes = employeeTypes;

    constructor(private formBuilder: FormBuilder, private store: Store<State>) {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            repeatPassword: ['', Validators.required],
            terms: [false, Validators.required],
            city: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            street: ['', Validators.required],
            numberOfBuilding: ['', Validators.required],
            numberOfFlat: ['', Validators.pattern("^[0-9]*$")],
            floor: ['', Validators.pattern("^[0-9]*$")],
            postalCode: ['', Validators.required],
            gender: [Gender.MALE, Validators.required],
            area: ['Wybierz...', Validators.required],
            type: ['Wybierz...', Validators.required],
            ratePerHours: [0, Validators.required],
        }, { validators:  this.passwordConfirming });
    }

    passwordConfirming(group: FormGroup) {
        const repeatPasswordInput = group.controls["repeatPassword"];

        if (group.value.password !== group.value.repeatPassword) {
            return repeatPasswordInput.setErrors({
                repeatProblem: true
            });
        } else {
            return repeatPasswordInput.setErrors(null);
        }
    }

    showModal() {
        this.openedModal = !this.openedModal;
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            const { terms, repeatPassword, ...registerEmployee} = this.registerForm.value;

            this.selectedRestaurant$.subscribe(restaurantId => {
                this.store.dispatch(ResetForm());
                this.store.dispatch(CreateEmployee({
                    createEmployee: {
                        ...registerEmployee,
                        restaurantId,
                    }
                }));
                this.registerForm.reset();
            });
        }
    }
}

