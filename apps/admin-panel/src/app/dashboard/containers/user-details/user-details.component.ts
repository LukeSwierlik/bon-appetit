import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { User } from '@bon-appetit/interfaces';
import { Observable } from 'rxjs';
import { authQuery } from '../../../+state/auth/auth.selectors';

@Component({
    selector: 'tin-user-details',
    templateUrl: './user-details.component.html'
})
export class UserDetailsComponent {
    user$: Observable<User> = this.store.pipe(select(authQuery.getUserInfo));

    constructor(private store: Store<State>) {}
}
