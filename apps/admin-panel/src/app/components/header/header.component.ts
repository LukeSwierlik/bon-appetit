import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../+state';
import { authQuery } from '../../+state/auth/auth.selectors';
import { Observable } from 'rxjs';
import { ordersQuery } from '../../+state/orders/orders.selectors';
import { Directory, Restaurant } from '@bon-appetit/interfaces';
import { Logout } from '../../+state/auth/auth.actions';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RestaurantsService } from '../../+state/restaurants/restaurants.service';
import { Router } from '@angular/router';

@Component({
    selector: 'tin-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    isAuthenticated$: Observable<boolean> = this.store.pipe(select(authQuery.getAuthenticated));
    email$: Observable<string> = this.store.pipe(select(authQuery.getEmail));
    getSumOrders$: Observable<number> = this.store.pipe(select(ordersQuery.getSumOrders));
    userRole$: Observable<Directory> = this.store.pipe(select(authQuery.getUserRole));

    constructor(private store: Store<State>,
                private restaurantsService: RestaurantsService,
                private router: Router) {}

    collapseDropdown = false;
    show = false;
    results: Restaurant[] = [];
    queryField: FormControl = new FormControl();

    @HostListener('document:click', ['$event'])
    onDocumentClick(): void {
        this.show = false;
    }

    ngOnInit() {
        this.queryField.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap(searchQuery => {
                    return this.restaurantsService.searchRestaurant(searchQuery);
                })
            )
            .subscribe(restaurants => {
                this.show = true;
                this.results = restaurants;
            });
    }

    moveToRestaurant(id: number): void {
        this.router.navigate(['restaurant', id]);
    }

    showDropDown(): void {
        this.collapseDropdown = !this.collapseDropdown;
    }

    logout(): void {
        this.store.dispatch(Logout());
    }
}
