import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { authQuery } from '../../../+state/auth/auth.selectors';
import { State } from '../../../+state';
import { User } from '@bon-appetit/interfaces';
import { usersQuery } from '../../../+state/users/users.selectors';

@Component({
    selector: 'tin-user-info',
    templateUrl: './user-info-container.component.html'
})
export class UserInfoContainerComponent {
    user$: Observable<User> = this.store.pipe(select(authQuery.getUserInfo));

    constructor(private store: Store<State> ) {
    }
}
