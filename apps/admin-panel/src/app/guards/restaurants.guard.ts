import { Injectable } from '@angular/core';
import { CanActivate } from '@nestjs/common';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../+state';
import { LoadRestaurants } from '../+state/restaurants/restaurants.actions';

@Injectable()
export class RestaurantsGuardService implements CanActivate, CanActivateChild {
    constructor(private store: Store<State>,
                private router: Router) {}

    canActivate(): boolean {
        return this.resolve();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.resolve();
    }

    private resolve(): boolean {
        this.store.dispatch(LoadRestaurants());

        return true;
    }
}
