import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { ProductsRoutingModule } from './products-routing.module';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { AlreadyInCartComponent } from './components/already-in-cart/already-in-cart.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardComponent,
    AddToCartComponent,
    ProductComponent,
    AlreadyInCartComponent,
  ],
  imports: [CommonModule, CoreModule, FormsModule, ProductsRoutingModule],
})
export class ProductsModule {}
