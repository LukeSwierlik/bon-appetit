import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../components/shared.module';
import { CompaniesComponent } from './containers/companies/companies.component';
import { CompanyDetailsComponent } from './containers/company-details/company-details.component';
import { CompanyContainerComponent } from './containers/company/company-container.component';
import { CreateOwnerContainerComponent } from './containers/create-owner/create-owner-container.component';
import { HomeContainerComponent } from './containers/home/home-container.component';
import { LoginContainerComponent } from './containers/login/login-container.component';
import { OrdersContainerComponent } from './containers/orders/orders-container.component';
import { RegisterContainerComponent } from './containers/register/register-container.component';
import { ReservationsContainerComponent } from './containers/reservations/reservations-container.component';
import { RestaurantContainerComponent } from './containers/restaurant/restaurant-container.component';
import { RestaurantsComponent } from './containers/restaurants/restaurants.component';
import { UserDetailsComponent } from './containers/user-details/user-details.component';
import { UserInfoContainerComponent } from './containers/user-info/user-info-container.component';
import { UserReservationsContainerComponent } from './containers/user-reservations/user-reservations-container.component';
import { UsersOrdersContainerComponent } from './containers/users-orders/users-orders-container.component';
import { UsersComponent } from './containers/users/users.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    declarations: [
        HomeContainerComponent,
        RegisterContainerComponent,
        LoginContainerComponent,
        OrdersContainerComponent,
        RestaurantContainerComponent,
        CreateOwnerContainerComponent,
        ReservationsContainerComponent,
        UsersComponent,
        UserDetailsComponent,
        UserInfoContainerComponent,
        UserReservationsContainerComponent,
        UsersOrdersContainerComponent,
        RestaurantsComponent,
        CompaniesComponent,
        CompanyContainerComponent,
        CompanyDetailsComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        NgxMaskModule.forRoot(options),
    ]
})
export class DashboardModule {}
