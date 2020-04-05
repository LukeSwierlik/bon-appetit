import { TitleComponent } from './title/title.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarProfile } from './sidebar-profile/sidebar-profile.component';
import { RouterModule } from '@angular/router';
import { CardMealComponent } from './card-meal/card-meal.component';
import { SpecialCardsComponent } from './special-cards/special-cards.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';
import { HeroComponent } from './hero/hero.component';
import { CompanyGuardService } from '../guards/company.guard';
import { SidebarUserComponent } from './sidebars/sidebar-user/sidebar-user.component';
import { SidebarRestaurantComponent } from './sidebars/sidebar-restaurant/sidebar-restaurant.component';
import { SidebarCompanyComponent } from './sidebars/sidebar-company/sidebar-company.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        TitleComponent,
        SidebarProfile,
        CardMealComponent,
        SpecialCardsComponent,
        ProductComponent,
        ProductsComponent,
        ModalComponent,
        AlertComponent,
        HeroComponent,
        SidebarUserComponent,
        SidebarRestaurantComponent,
        SidebarCompanyComponent,
    ],
    exports: [
        TitleComponent,
        SidebarProfile,
        CardMealComponent,
        SpecialCardsComponent,
        ProductComponent,
        ProductsComponent,
        ModalComponent,
        AlertComponent,
        HeroComponent,
        SidebarRestaurantComponent,
        SidebarUserComponent,
        SidebarCompanyComponent
    ],
    providers: [CompanyGuardService]
})
export class SharedModule {}
