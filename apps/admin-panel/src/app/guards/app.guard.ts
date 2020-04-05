import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from '@nestjs/common';
import { select, Store } from '@ngrx/store';
import { authQuery } from '../+state/auth/auth.selectors';
import { State } from '../+state';
import { Observable } from 'rxjs';
import { Directory } from '@bon-appetit/interfaces';

@Injectable()
export class AppGuardService implements CanActivate {
    userRole$: Observable<Directory> = this.store.pipe(select(authQuery.getUserRole));

    constructor(private store: Store<State>, public router: Router) {}

    canActivate(): boolean {
        this.userRole$.subscribe(role => {
            if (role) {
                if (role.id > 1) {
                    this.router.navigate(['/user']);

                    return false;
                }
            }
        });

        return true;
    }
}
