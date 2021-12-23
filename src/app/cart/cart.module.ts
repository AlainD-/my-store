import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { TotalPriceComponent } from './components/total-price/total-price.component';

@NgModule({
  declarations: [CartComponent, OrderItemComponent, TotalPriceComponent],
  imports: [CommonModule, CoreModule, FormsModule, CartRoutingModule],
})
export class CartModule {}
