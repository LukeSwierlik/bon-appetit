import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { usersQuery } from '../../../+state/users/users.selectors';
import { Observable, Subscription } from 'rxjs';
import { User, UserType } from '@bon-appetit/interfaces';
import { SearchUsers, SelectedUser } from '../../../+state/users/users.actions';
import { Router } from '@angular/router';
import { LoadReservationsUser } from '../../../+state/reservations/reservations.actions';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'tin-users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
    users$: Observable<User[]> = this.store.pipe(select(usersQuery.getUsers));

    usersSearchControl = new FormControl();
    formCtrlSub: Subscription;

    constructor(private store: Store<State>,
                private router: Router) {}

    ngOnInit() {
        this.formCtrlSub = this.usersSearchControl.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged()
            )
            .subscribe(searchQuery => {
                this.store.dispatch(SearchUsers({ searchQuery }));
            });
    }

    details(email: string, userId: number): void {
        this.store.dispatch(SelectedUser({ selectedUser: userId }));
        this.store.dispatch(LoadReservationsUser());

        this.router.navigate(['/users/', userId, 'details']);
    }

    getColorRole(userType: UserType): string {
        switch (userType) {
            case UserType.USER: {
                return 'text-primary';
            }
            case UserType.COOK: {
                return 'text-secondary';
            }
            case UserType.DELIVERER: {
                return 'text-info';
            }
            case UserType.WAITER: {
                return 'text-warning';
            }
            case UserType.EMPLOYEE: {
                return 'text-danger';
            }
            case UserType.OWNER: {
                return 'text-success';
            }
            default: {
                return 'text-dark';
            }
        }
    }
}
