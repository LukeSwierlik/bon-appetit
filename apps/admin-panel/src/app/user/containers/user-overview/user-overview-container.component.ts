import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { authQuery } from '../../../+state/auth/auth.selectors';
import { State } from '../../../+state';
import { User } from '@bon-appetit/interfaces';

@Component({
    selector: 'tin-user-overview',
    templateUrl: './user-overview-container.component.html'
})
export class UserOverviewContainerComponent {
    user$: Observable<User> = this.store.pipe(select(authQuery.getUserInfo));

    constructor(private store: Store<State> ) {
    }
}
