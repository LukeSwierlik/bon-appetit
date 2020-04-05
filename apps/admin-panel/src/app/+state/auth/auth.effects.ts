import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginUser, CreateUser, SuccessLogin, Logout } from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorAction, SuccessForm } from '../commons/commons.actions';
import { Directory, ErrorType, User, UserType } from '@bon-appetit/interfaces';
import { ClearOrders } from '../orders/orders.actions';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CreateUser),
            switchMap(({ type, ...payload }) => {
                return this.authService.createUser(payload).pipe(
                    map(() => {
                        return SuccessForm();
                    }),
                    catchError(e => {
                        return of(
                            ErrorAction({
                                error: {
                                    type: ErrorType.ERROR_CREATE_USER,
                                    message: 'Wystąpił bląd podczas tworzenia użytkownika.'
                                }
                            })
                        );
                    })
                );
            })
        )
    );

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginUser),
            switchMap(({ type, ...payload }) => {
                return this.authService.loginUser(payload).pipe(
                    map((response: User) => {
                        localStorage.setItem('auth_token', response.email);

                        this.router.navigate(['/']);

                        const user: User = {
                            ...response,
                            userType: AuthEffects.generateUserType(response.type)
                        };

                        return SuccessLogin({ user });
                    }),
                    catchError(err => {
                        localStorage.removeItem('auth_token');

                        return of(
                            ErrorAction({
                                error: {
                                    type: ErrorType.ERROR_LOGIN_USER,
                                    message: 'Wystąpił bląd podczas logowania się. Nieprawidłowy login lub hasło.'
                                }
                            })
                        );
                    })
                );
            })
        )
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(Logout),
                map(() => {
                    localStorage.removeItem('auth_token');

                    return ClearOrders();
                })
            ),
    );

    private static generateUserType(userType: UserType): Directory {
        switch (userType) {
            case UserType.USER: {
                return {
                    id: 1,
                    name: userType
                };
            }
            case UserType.EMPLOYEE: {
                return {
                    id: 2,
                    name: userType
                };
            }
            case UserType.DELIVERER: {
                return {
                    id: 3,
                    name: userType
                };
            }
            case UserType.COOK: {
                return {
                    id: 4,
                    name: userType
                };
            }
            case UserType.WAITER: {
                return {
                    id: 5,
                    name: userType
                };
            }
            case UserType.OWNER: {
                return {
                    id: 6,
                    name: userType
                };
            }
            default: {
                return {
                    id: 0,
                    name: userType
                };
            }
        }
    }
}
