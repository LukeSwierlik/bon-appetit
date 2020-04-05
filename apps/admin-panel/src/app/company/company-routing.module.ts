import { RouterModule, Routes } from '@angular/router';
import { CompanyLandingContainerComponent } from './containers/company-landing/company-landing-container.component';
import { NgModule } from '@angular/core';
import { CompanyOverviewContainerComponent } from './containers/company-overview/company-overview-container.component';
import { CompanyRestaurantsContainerComponent } from './containers/company-restaurants/company-restaurants-container.component';
import { CreateRestaurantContainerComponent } from './containers/create-restaurant/create-restaurant-container.component';
import { CompanyGuardService } from '../guards/company.guard';
import { UserLandingContainerComponent } from '../user/containers/user-landing/user-landing-container.component';
import { UserOverviewContainerComponent } from '../user/containers/user-overview/user-overview-container.component';
import { CreateCompanyContainerComponent } from '../user/containers/create-company/create-company-container.component';

const routes: Routes = [
    {
        path: 'company',
        component: CompanyLandingContainerComponent,
        canActivateChild: [CompanyGuardService],
        canActivate: [CompanyGuardService],
        children: [
            { path: '', pathMatch: 'full', component: CompanyOverviewContainerComponent, },
            { path: 'restaurants', pathMatch: 'full', component: CompanyRestaurantsContainerComponent },
            { path: 'create-restaurant', pathMatch: 'full', component: CreateRestaurantContainerComponent },
            { path: 'user', component: UserLandingContainerComponent,
                children: [
                    { path: '', pathMatch: 'full', component: UserOverviewContainerComponent },

                ]},
            { path: 'create-company', pathMatch: 'full', component: CreateCompanyContainerComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule {}
