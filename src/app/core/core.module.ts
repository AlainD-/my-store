import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';
import { ComponentsModule } from './components/components.module';
import { IsAdminDirective } from './directives/is-admin.directive';
import { IsAuthenticatedDirective } from './directives/is-authenticated.directive';
import { CategoryInfoPipe } from './pipes/category-info.pipe';
import { ProductInfoPipe } from './pipes/product-info.pipe';
import { UserInfoPipe } from './pipes/user-info.pipe';

@NgModule({
  declarations: [
    CategoryInfoPipe,
    IsAdminDirective,
    IsAuthenticatedDirective,
    ProductInfoPipe,
    UserInfoPipe,
  ],
  imports: [CommonModule, PrimeNgModule, FontAwesomeModule, ComponentsModule],
  exports: [
    PrimeNgModule,
    FontAwesomeModule,
    ComponentsModule,
    CategoryInfoPipe,
    IsAdminDirective,
    IsAuthenticatedDirective,
    ProductInfoPipe,
    UserInfoPipe,
  ],
})
export class CoreModule {}
