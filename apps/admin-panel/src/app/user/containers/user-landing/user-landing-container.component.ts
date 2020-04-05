import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { authQuery } from '../../../+state/auth/auth.selectors';
import { State } from '../../../+state';
import { FetchCompany } from '../../../+state/company/company.actions';
import { User } from '@bon-appetit/interfaces';

@Component({
    selector: 'tin-user-landing-container',
    templateUrl: './user-landing-container.component.html'
})
export class UserLandingContainerComponent implements OnInit {
    user$: Observable<User> = this.store.pipe(select(authQuery.getUserInfo));
    userId$: Observable<number> = this.store.pipe(select(authQuery.getUserId));

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.userId$.subscribe(ownerId => {
            this.store.dispatch(FetchCompany({ ownerId }))
        });
    }
}
