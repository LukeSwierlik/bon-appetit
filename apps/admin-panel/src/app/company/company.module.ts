import { NgModule } from '@angular/core';
import { CompanyLandingContainerComponent } from './containers/company-landing/company-landing-container.component';
import { CompanyOverviewContainerComponent } from './containers/company-overview/company-overview-container.component';
import { CompanyRestaurantsContainerComponent } from './containers/company-restaurants/company-restaurants-container.component';
import { CompanyRoutingModule } from './company-routing.module';
import { CommonModule } from '@angular/common';
import { CardRestaurant } from '../components/card-restaurant/card-restaurant.component';
import { SharedModule } from '../components/shared.module';
import { CreateRestaurantContainerComponent } from './containers/create-restaurant/create-restaurant-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    imports: [
        CompanyRoutingModule,
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(options),
    ],
    declarations: [
        CompanyLandingContainerComponent,
        CompanyOverviewContainerComponent,
        CompanyRestaurantsContainerComponent,
        CreateRestaurantContainerComponent,
        CardRestaurant,
    ]
})
export class CompanyModule {}
