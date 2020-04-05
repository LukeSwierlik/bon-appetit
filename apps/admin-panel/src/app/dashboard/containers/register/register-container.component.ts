import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { CreateUser } from '../../../+state/auth/auth.actions';
import { Gender, Month } from '@bon-appetit/interfaces';
import { CommonsState } from '../../../+state/commons/commons.reducer';
import { formQuery } from '../../../+state/commons/commons.selectors';
import { Observable } from 'rxjs';
import { termsAndConditionals, areasPoland, months } from '../../../../constans';
import { ResetForm } from '../../../+state/commons/commons.actions';
import { AlertType } from '../../../components/alert/alert.component';

@Component({
    selector: 'tin-register',
    templateUrl: './register-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterContainerComponent {
    formStatus$: Observable<CommonsState> = this.store.pipe(select(formQuery.getForm));
    registerForm: FormGroup;

    openedModal = false;

    readonly Gender = Gender;
    readonly AlertType = AlertType;
    readonly termsAndConditionals = termsAndConditionals;
    readonly areasPoland = areasPoland;

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
            usernameCard: ['', Validators.required],
            numberCard: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            expirationMonth: ['MM', Validators.required],
            expirationYear: ['YYYY', [Validators.required, Validators.pattern("^[0-9]*$")]],
            cvv: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        }, { validators:  this.passwordConfirming });
    }

    public passwordConfirming(group: FormGroup): void {
        const repeatPasswordInput = group.controls["repeatPassword"];

        if (group.value.password !== group.value.repeatPassword) {
            repeatPasswordInput.setErrors({
                repeatProblem: true
            });
        } else {
            repeatPasswordInput.setErrors(null);
        }
    }

    public showModal(): void {
        this.openedModal = !this.openedModal;
    }

    public onSubmit(): void {
        if (this.registerForm.valid) {
            const { terms, repeatPassword, ...registerUser} = this.registerForm.value;

            this.store.dispatch(ResetForm());
            this.store.dispatch(CreateUser(registerUser));
            this.registerForm.reset();
        }
    }

    public generationYears(): number[] {
        const date = new Date();
        const years = [];

        for (let i = date.getFullYear(); i <= date.getFullYear() + 15; i++) {
            years.push(i);
        }

        return years;
    }

    public generationMonths(): Month[] {
        return months.map((month, i) => ({
            id: i+1,
            name: month
        }))
    }
}

