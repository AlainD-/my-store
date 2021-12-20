import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';
import { ComponentsModule } from './components/components.module';
import { CategoryNamePipe } from './pipes/category-name.pipe';
import { IsAdminDirective } from './directives/is-admin.directive';
import { IsAuthenticatedDirective } from './directives/is-authenticated.directive';

@NgModule({
  declarations: [CategoryNamePipe, IsAdminDirective, IsAuthenticatedDirective],
  imports: [CommonModule, PrimeNgModule, ComponentsModule],
  exports: [
    PrimeNgModule,
    ComponentsModule,
    CategoryNamePipe,
    IsAdminDirective,
    IsAuthenticatedDirective,
  ],
})
export class CoreModule {}
