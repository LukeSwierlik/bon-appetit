import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../../+state';
import { LoginUser } from '../../../+state/auth/auth.actions';

@Component({
    selector: 'tin-employee-login',
    templateUrl: './employee-login-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeLoginContainerComponent {
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private store: Store<State>) {
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: ['']
        });
    }

    onSubmit(): void {
        this.store.dispatch(LoginUser(this.loginForm.value))
    }
}
