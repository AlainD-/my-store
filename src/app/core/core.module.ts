import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PrimeNgModule, ComponentsModule],
  exports: [PrimeNgModule, ComponentsModule],
})
export class CoreModule {}
