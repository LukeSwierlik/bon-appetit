import { NgModule } from '@angular/core';
import { UserOverviewContainerComponent } from './containers/user-overview/user-overview-container.component';
import { CreateCompanyContainerComponent } from './containers/create-company/create-company-container.component';
import { SharedModule } from '../components/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserLandingContainerComponent } from './containers/user-landing/user-landing-container.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    declarations: [
        UserOverviewContainerComponent,
        CreateCompanyContainerComponent,
        UserLandingContainerComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxMaskModule.forRoot(options),
    ]
})
export class UserModule {}
