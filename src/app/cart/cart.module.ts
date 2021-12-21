import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, CoreModule, CartRoutingModule],
})
export class CartModule {}
