import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [AvatarModule, ButtonModule, CardModule, InputTextModule, MenubarModule],
})
export class PrimeNgModule {}
