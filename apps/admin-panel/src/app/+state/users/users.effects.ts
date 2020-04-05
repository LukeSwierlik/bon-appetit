import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadUsers, LoadUsersSuccess, SearchUsers, SelectedUser } from './users.actions';
import { map, switchMap, take } from 'rxjs/operators';
import { combineLatest, from, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../index';
import { usersQuery } from './users.selectors';
import { User } from '@bon-appetit/interfaces';
import { Logout, SuccessLogin } from '../auth/auth.actions';

@Injectable()
export class UsersEffects {
    users$: Observable<User[]> = this.store.select(usersQuery.getUsers);

    constructor(private usersService: UsersService, private actions$: Actions, private store: Store<State>) {}

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadUsers),
            switchMap(() => {
                return this.usersService.getUsers().pipe(
                    take(1),
                    map(users => {
                        return LoadUsersSuccess({ users });
                    })
                );
            })
        )
    );

    selectedUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SelectedUser),
            switchMap(action => {
                return combineLatest([this.users$]).pipe(
                    take(1),
                    switchMap(([users]) => {
                        const user = users.find(u => u.id === action.selectedUser) || null;

                        return from([Logout(), SuccessLogin({ user })]);
                    })
                );
            })
        )
    );

    searchUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SearchUsers),
            switchMap(({ searchQuery }) => {
                return this.usersService.getSearchUsers(searchQuery).pipe(
                    take(1),
                    map(users => {
                        return LoadUsersSuccess({ users });
                    })
                );
            })
        )
    );
}
