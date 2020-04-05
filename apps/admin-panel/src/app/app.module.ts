import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { metaReducers, reducers } from './+state';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { RestaurantsEffects } from './+state/restaurants/restaurants.effects';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthEffects } from './+state/auth/auth.effects';
import { OrdersEffects } from './+state/orders/orders.effects';
import { CompanyEffects } from './+state/company/company.effects';
import { CompanyModule } from './company/company.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { AppGuardService } from './guards/app.guard';
import { TablesEffects } from './+state/tables/tables.effects';
import { ReservationsEffects } from './+state/reservations/reservations.effects';
import { DishesEffects } from './+state/dishes/dishes.effects';
import { EmployeesEffects } from './+state/employees/employees.effects';
import { UsersEffects } from './+state/users/users.effects';
import { ViewOrdersEffects } from './+state/viewOrders/viewOrders.effects';
import { CompaniesEffects } from './+state/companies/companies.effects';
import { RestaurantsGuardService } from './guards/restaurants.guard';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([RestaurantsEffects, AuthEffects, OrdersEffects, CompanyEffects, DishesEffects, TablesEffects, ReservationsEffects, EmployeesEffects, UsersEffects, ViewOrdersEffects, CompaniesEffects]),
        BrowserModule,
        ReactiveFormsModule,
        CompanyModule,
        RestaurantModule,
        DashboardModule,
        UserModule,
    ],
    bootstrap: [AppComponent],
    providers: [AppGuardService, RestaurantsGuardService],
    exports: []
})
export class AppModule {
}
