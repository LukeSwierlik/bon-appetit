import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouteSidebar } from '../../../constans';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { authQuery } from '../../+state/auth/auth.selectors';
import { State } from '../../+state';
import { companyQuery } from '../../+state/company/company.selectors';
import { Directory } from '@bon-appetit/interfaces';
import { restaurantsQuery } from '../../+state/restaurants/restaurants.selectors';

@Component({
    selector: 'tin-sidebar-profile',
    templateUrl: './sidebar-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarProfile {
    @Input() routes: RouteSidebar[];

    userRole$: Observable<Directory> = this.store.pipe(select(authQuery.getUserRole));
    selectedRestaurant$: Observable<number> = this.store.pipe(select(restaurantsQuery.getSelectedRestaurant));
    companyId$: Observable<number> = this.store.pipe(select(companyQuery.getCompanyId));


    constructor(private store: Store<State> ) {
    }
}
