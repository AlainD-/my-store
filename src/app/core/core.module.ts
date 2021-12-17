import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';
import { ComponentsModule } from './components/components.module';
import { CategoryNamePipe } from './pipes/category-name.pipe';

@NgModule({
  declarations: [CategoryNamePipe],
  imports: [CommonModule, PrimeNgModule, ComponentsModule],
  exports: [PrimeNgModule, ComponentsModule, CategoryNamePipe],
})
export class CoreModule {}
