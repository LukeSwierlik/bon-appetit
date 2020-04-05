import { NgModule } from '@angular/core';
import { RestaurantLandingContainerComponent } from './containers/restaurant-landing/restaurant-landing-container.component';
import { RestaurantDetailsContainerComponent } from './containers/restaurant-details/restaurant-details-container.component';
import { RestaurantDishesContainerComponent } from './containers/restaurant-dishes/restaurant-dishes-container.component';
import { RestaurantEmployeesContainerComponent } from './containers/restaurant-employees/restaurant-employees-container.component';
import { RestaurantOrdersContainerComponent } from './containers/restaurant-orders/restaurant-orders-container.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../components/shared.module';
import { RouterModule } from '@angular/router';
import { RestaurantEditContainerComponent } from './containers/restaurant-edit/restaurant-edit-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateDishContainerComponent } from './containers/create-dish/create-dish-container.component';
import { CreateEmployeeContainerComponent } from './containers/create-employee/create-employee-container.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { CreateTableContainerComponent } from './containers/create-table/create-table-container.component';
import { TablesContainerComponent } from './containers/tables/tables-container.component';
import { RestaurantReservationsContainerComponent } from './containers/restaurant-reservations/restaurant-reservations-container.component';
import { EditDishContainerComponent } from './containers/edit-dish/edit-dish-container.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    declarations: [
        RestaurantLandingContainerComponent,
        RestaurantDetailsContainerComponent,
        RestaurantDishesContainerComponent,
        RestaurantEmployeesContainerComponent,
        RestaurantOrdersContainerComponent,
        RestaurantEditContainerComponent,
        CreateDishContainerComponent,
        CreateEmployeeContainerComponent,
        CreateTableContainerComponent,
        TablesContainerComponent,
        RestaurantReservationsContainerComponent,
        EditDishContainerComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(options),
    ]
})
export class RestaurantModule {}
