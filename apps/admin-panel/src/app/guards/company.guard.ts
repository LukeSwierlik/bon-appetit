import { Injectable } from '@angular/core';
import { CanActivate } from '@nestjs/common';
import { select, Store } from '@ngrx/store';
import { authQuery } from '../+state/auth/auth.selectors';
import { State } from '../+state';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Directory } from '@bon-appetit/interfaces';

@Injectable()
export class CompanyGuardService implements CanActivate, CanActivateChild {
    userRole$: Observable<Directory> = this.store.pipe(select(authQuery.getUserRole));

    constructor(private store: Store<State>, public router: Router) {}

    canActivate(): boolean {
        return this.resolve();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.resolve();
    }

    private resolve(): boolean {
        this.userRole$.subscribe(role => {
            if (!role || role.id <= 1) {
                this.router.navigate(['/']);

                return false;
            }
        });

        return true;
    }
}
