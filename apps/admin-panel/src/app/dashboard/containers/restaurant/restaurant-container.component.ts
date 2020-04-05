import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { restaurantsQuery } from '../../../+state/restaurants/restaurants.selectors';
import { AddToOrders } from '../../../+state/orders/orders.actions';
import { authQuery } from '../../../+state/auth/auth.selectors';
import { Observable } from 'rxjs';
import { Dish, ReservationStatus, Restaurant, Table, User } from '@bon-appetit/interfaces';
import { LoadDishes } from '../../../+state/dishes/dishes.actions';
import { dishesQuery } from '../../../+state/dishes/dishes.selectors';
import { State } from '../../../+state';
import { SelectedRestaurant } from '../../../+state/restaurants/restaurants.actions';
import { CommonsState } from '../../../+state/commons/commons.reducer';
import { formQuery } from '../../../+state/commons/commons.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetForm } from '../../../+state/commons/commons.actions';
import { LoadTables } from '../../../+state/tables/tables.actions';
import { AlertType } from '../../../components/alert/alert.component';
import { tablesQuery } from '../../../+state/tables/tables.selectors';
import { CreateReservation } from '../../../+state/reservations/reservations.actions';

@Component({
    selector: 'tin-restaurant-container',
    templateUrl: './restaurant-container.component.html'
})
export class RestaurantContainerComponent implements OnInit {
    selectedRestaurant$: Observable<Restaurant> = this.store.pipe(select(restaurantsQuery.getRestaurant));
    dishes$: Observable<Dish[]> = this.store.pipe(select(dishesQuery.getDishes));
    authenticated$: Observable<boolean> = this.store.pipe(select(authQuery.getAuthenticated));
    formStatus$: Observable<CommonsState> = this.store.pipe(select(formQuery.getForm));
    tables$: Observable<Table[]> = this.store.pipe(select(tablesQuery.getTables));
    user$: Observable<User> = this.store.pipe(select(authQuery.getUserInfo));

    restaurantId: string;
    showFormReservation = false;
    showDishes = true;
    maxPeopleCount = 0;
    tableName: string;
    createReservationForm: FormGroup;
    tables: Table[];

    readonly AlertType = AlertType;

    constructor(private formBuilder: FormBuilder, private store: Store<State>, private route: ActivatedRoute) {
        this.createReservationForm = this.formBuilder.group({
            tableId: ['Wybierz...', Validators.required],
            peopleCount: [1, [Validators.required, Validators.min(2), Validators.max(30)]],
            date: ['', Validators.required],
            hour: ['12:00', Validators.required]
        });
    }

    ngOnInit(): void {
        this.store.dispatch(ResetForm());

        this.route.params.subscribe((params: Params) => {
            this.restaurantId = params.id;

            this.store.dispatch(SelectedRestaurant({ restaurantId: parseInt(params.id, 10) }));
            this.store.dispatch(LoadDishes());
            this.store.dispatch(LoadTables());
        });

        this.tables$.subscribe(tables => {
            this.tables = tables;
        });
    }

    addToOrders(payload: any): void {
        this.store.dispatch(
            AddToOrders({
                order: {
                    ...payload,
                    restaurantId: parseInt(this.restaurantId, 10)
                }
            })
        );
    }

    toggleReservationForm(): void {
        this.showFormReservation = !this.showFormReservation;
        this.showDishes = !this.showDishes;
    }

    onChange(event): void {
        const id = event.target.value;
        const table = this.tables.find(t => t.id === parseInt(id, 10));

        const { name, maxPeopleCount } = table;

        this.maxPeopleCount = maxPeopleCount;
        this.tableName = name;
    }

    onSubmit(): void {
        if (this.createReservationForm.valid) {
            const { tableId, peopleCount, date, hour } = this.createReservationForm.value;

            this.store.dispatch(
                CreateReservation({
                    createReservation: {
                        peopleCount,
                        date,
                        hour,
                        tableId: parseInt(tableId, 10),
                        status: ReservationStatus.PRZYJETO
                    }
                })
            );

            this.store.dispatch(ResetForm());
        }
    }

    getMessageSuccessReservation(restaurant: Restaurant, user: User): string {
        const { peopleCount, date, hour } = this.createReservationForm.value;

        return `Rezerwacja została przyjęta pomyślnie! Podsumowanie: Rezerwacja do restauracji ${restaurant.name}, stolik ${this.tableName}, ilość osób ${peopleCount} / ${this.maxPeopleCount}, dnia ${date}, na godzinę ${hour} na użytkownika: ${user.firstName} ${user.lastName}`;
    }
}
