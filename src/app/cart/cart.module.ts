import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { TotalPriceComponent } from './components/total-price/total-price.component';
import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { SubmitCartFormComponent } from './components/submit-cart-form/submit-cart-form.component';

@NgModule({
  declarations: [CartComponent, OrderItemComponent, TotalPriceComponent, EmptyCartComponent, OrderCompletedComponent, SubmitCartFormComponent],
  imports: [CommonModule, CoreModule, FormsModule, CartRoutingModule],
})
export class CartModule {}
