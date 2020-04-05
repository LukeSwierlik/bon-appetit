import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { LoginUser } from '../../../+state/auth/auth.actions';
import { Observable } from 'rxjs';
import { CommonsState } from '../../../+state/commons/commons.reducer';
import { formQuery } from '../../../+state/commons/commons.selectors';
import { AlertType } from '../../../components/alert/alert.component';

@Component({
    selector: 'tin-login',
    templateUrl: './login-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginContainerComponent {
    formStatus$: Observable<CommonsState> = this.store.pipe(select(formQuery.getForm));

    loginForm: FormGroup;

    readonly AlertType = AlertType;

    constructor(private formBuilder: FormBuilder, private store: Store<State>) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        this.store.dispatch(LoginUser({
            form: this.loginForm.value
        }))
    }

}
