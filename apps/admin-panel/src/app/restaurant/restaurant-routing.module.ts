import { RouterModule, Routes } from '@angular/router';
import { CreateRestaurantContainerComponent } from '../company/containers/create-restaurant/create-restaurant-container.component';
import { RestaurantLandingContainerComponent } from './containers/restaurant-landing/restaurant-landing-container.component';
import { NgModule } from '@angular/core';
import { RestaurantDetailsContainerComponent } from './containers/restaurant-details/restaurant-details-container.component';
import { RestaurantEmployeesContainerComponent } from './containers/restaurant-employees/restaurant-employees-container.component';
import { RestaurantOrdersContainerComponent } from './containers/restaurant-orders/restaurant-orders-container.component';
import { RestaurantDishesContainerComponent } from './containers/restaurant-dishes/restaurant-dishes-container.component';
import { RestaurantEditContainerComponent } from './containers/restaurant-edit/restaurant-edit-container.component';
import { CreateDishContainerComponent } from './containers/create-dish/create-dish-container.component';
import { CreateEmployeeContainerComponent } from './containers/create-employee/create-employee-container.component';
import { CreateTableContainerComponent } from './containers/create-table/create-table-container.component';
import { TablesContainerComponent } from './containers/tables/tables-container.component';
import { RestaurantReservationsContainerComponent } from './containers/restaurant-reservations/restaurant-reservations-container.component';
import { EditDishContainerComponent } from './containers/edit-dish/edit-dish-container.component';

const routes: Routes = [
    {
        path: 'company/restaurants/:id',
        component: RestaurantLandingContainerComponent,
        children: [
            { path: '', pathMatch: 'full', component: RestaurantDetailsContainerComponent },
            { path: 'employees', pathMatch: 'full', component: RestaurantEmployeesContainerComponent },
            { path: 'orders', pathMatch: 'full', component: RestaurantOrdersContainerComponent },
            { path: 'dishes', pathMatch: 'full', component: RestaurantDishesContainerComponent },
            { path: 'edit', pathMatch: 'full', component: RestaurantEditContainerComponent },
            { path: 'create-dishes', pathMatch: 'full', component: CreateDishContainerComponent },
            { path: 'edit-dish', pathMatch: 'full', component: EditDishContainerComponent },
            { path: 'create-employee', pathMatch: 'full', component: CreateEmployeeContainerComponent },
            { path: 'create-table', pathMatch: 'full', component: CreateTableContainerComponent },
            { path: 'tables', pathMatch: 'full', component: TablesContainerComponent },
            { path: 'reservations', pathMatch: 'full', component: RestaurantReservationsContainerComponent },
            { path: 'create-restaurant', pathMatch: 'full', component: CreateRestaurantContainerComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RestaurantRoutingModule {}
