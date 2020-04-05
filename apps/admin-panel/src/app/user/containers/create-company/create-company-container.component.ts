import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonsState } from '../../../+state/commons/commons.reducer';
import { select, Store } from '@ngrx/store';
import { formQuery } from '../../../+state/commons/commons.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../../../+state';
import { CreateCompany } from '../../../+state/company/company.actions';
import { authQuery } from '../../../+state/auth/auth.selectors';
import { AlertType } from '../../../components/alert/alert.component';
import { take } from 'rxjs/operators';
import { ResetForm } from '../../../+state/commons/commons.actions';
import { termsAndConditionals, areasPoland } from 'apps/admin-panel/src/constans';

@Component({
    selector: 'tin-create-company-container',
    templateUrl: './create-company-container.component.html'
})
export class CreateCompanyContainerComponent {
    formStatus$: Observable<CommonsState> = this.store.pipe(select(formQuery.getForm));
    userId$: Observable<number> = this.store.pipe(select(authQuery.getUserId));
    registerCompanyForm: FormGroup;

    openedModal = false;

    readonly AlertType = AlertType;
    readonly termsAndConditionals = termsAndConditionals;
    readonly areasPoland = areasPoland;

    constructor(private formBuilder: FormBuilder, private store: Store<State>) {
        this.registerCompanyForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            logoUrl: [
                '',
                [Validators.required, Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')]
            ],
            terms: [false, Validators.required],
            city: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            street: ['', Validators.required],
            numberOfBuilding: ['', Validators.required],
            postalCode: ['', Validators.required],
            area: ['Wybierz...', Validators.required],
            numberOfFlat: ['', Validators.pattern('^[0-9]*$')],
            floor: ['', Validators.pattern('^[0-9]*$')]
        });
    }

    onSubmit(): void {
        if (this.registerCompanyForm.valid) {
            this.store.dispatch(ResetForm());

            this.userId$.pipe(take(1)).subscribe(ownerId => {
                this.store.dispatch(
                    CreateCompany({
                        createCompany: {
                            ...this.registerCompanyForm.value,
                            ownerId
                        }
                    })
                );

                // this.registerCompanyForm.reset();
            });
        }
    }

    showModal(): void {
        this.openedModal = !this.openedModal;
    }
}
