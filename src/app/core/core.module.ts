import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';
import { ComponentsModule } from './components/components.module';
import { CategoryNamePipe } from './pipes/category-name.pipe';
import { IsAdminDirective } from './directives/is-admin.directive';
import { IsAuthenticatedDirective } from './directives/is-authenticated.directive';
import { ProductNamePipe } from './pipes/product-name.pipe';
import { UserInfoPipe } from './pipes/user-info.pipe';

@NgModule({
  declarations: [
    CategoryNamePipe,
    IsAdminDirective,
    IsAuthenticatedDirective,
    ProductNamePipe,
    UserInfoPipe,
  ],
  imports: [CommonModule, PrimeNgModule, FontAwesomeModule, ComponentsModule],
  exports: [
    PrimeNgModule,
    FontAwesomeModule,
    ComponentsModule,
    CategoryNamePipe,
    IsAdminDirective,
    IsAuthenticatedDirective,
    ProductNamePipe,
    UserInfoPipe,
  ],
})
export class CoreModule {}
