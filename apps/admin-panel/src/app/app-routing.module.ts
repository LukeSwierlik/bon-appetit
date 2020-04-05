import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyRoutingModule } from './company/company-routing.module';
import { CompanyRestaurantsContainerComponent } from './company/containers/company-restaurants/company-restaurants-container.component';
import { CompaniesComponent } from './dashboard/containers/companies/companies.component';
import { CompanyDetailsComponent } from './dashboard/containers/company-details/company-details.component';
import { CompanyContainerComponent } from './dashboard/containers/company/company-container.component';
import { CreateOwnerContainerComponent } from './dashboard/containers/create-owner/create-owner-container.component';
import { LoginContainerComponent } from './dashboard/containers/login/login-container.component';
import { OrdersContainerComponent } from './dashboard/containers/orders/orders-container.component';
import { RegisterContainerComponent } from './dashboard/containers/register/register-container.component';
import { ReservationsContainerComponent } from './dashboard/containers/reservations/reservations-container.component';
import { RestaurantContainerComponent } from './dashboard/containers/restaurant/restaurant-container.component';
import { RestaurantsComponent } from './dashboard/containers/restaurants/restaurants.component';
import { UserDetailsComponent } from './dashboard/containers/user-details/user-details.component';
import { UserInfoContainerComponent } from './dashboard/containers/user-info/user-info-container.component';
import { UserReservationsContainerComponent } from './dashboard/containers/user-reservations/user-reservations-container.component';
import { UsersOrdersContainerComponent } from './dashboard/containers/users-orders/users-orders-container.component';
import { UsersComponent } from './dashboard/containers/users/users.component';
import { AppGuardService } from './guards/app.guard';
import { RestaurantsGuardService } from './guards/restaurants.guard';
import { RestaurantRoutingModule } from './restaurant/restaurant-routing.module';
import { CreateCompanyContainerComponent } from './user/containers/create-company/create-company-container.component';
import { UserLandingContainerComponent } from './user/containers/user-landing/user-landing-container.component';
import { UserOverviewContainerComponent } from './user/containers/user-overview/user-overview-container.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
        component: LoginContainerComponent,
        canActivate: [AppGuardService],
        canActivateChild: [AppGuardService]
    },
    {
        path: 'restaurant/:id',
        pathMatch: 'full',
        component: RestaurantContainerComponent
    },
    { path: 'register', pathMatch: 'full', component: RegisterContainerComponent },
    { path: 'login', pathMatch: 'full', component: LoginContainerComponent },
    { path: 'register/owner', pathMatch: 'full', component: CreateOwnerContainerComponent },
    {
        path: 'user',
        component: UserLandingContainerComponent,
        children: [
            { path: '', pathMatch: 'full', component: UserOverviewContainerComponent },
            { path: 'reservations', pathMatch: 'full', component: ReservationsContainerComponent },
            { path: 'create-company', pathMatch: 'full', component: CreateCompanyContainerComponent }
        ]
    },
    { path: 'orders', pathMatch: 'full', component: OrdersContainerComponent },
    { path: 'users', pathMatch: 'full', component: UsersComponent },
    { path: 'restaurants', pathMatch: 'full', component: RestaurantsComponent, canActivate: [RestaurantsGuardService] },
    { path: 'companies', pathMatch: 'full', component: CompaniesComponent },
    {
        path: 'companies/:id/details', component: CompanyDetailsComponent, children: [
            { path: '', pathMatch: 'full', component: CompanyContainerComponent },
            { path: 'restaurants', pathMatch: 'full', component: CompanyRestaurantsContainerComponent }
        ]
    },
    {
        path: 'users/:id/details', component: UserDetailsComponent, children: [
            { path: '', pathMatch: 'full', component: UserInfoContainerComponent },
            { path: 'reservations', pathMatch: 'full', component: UserReservationsContainerComponent },
            { path: 'orders', pathMatch: 'full', component: UsersOrdersContainerComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), CompanyRoutingModule, RestaurantRoutingModule],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
