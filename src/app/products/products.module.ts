import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ProductComponent } from './product/product.component';
import { ProductImageComponent } from './product-image/product-image.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardComponent,
    AddToCartComponent,
    ProductComponent,
    ProductImageComponent,
  ],
  imports: [CommonModule, CoreModule, FormsModule, ProductsRoutingModule],
})
export class ProductsModule {}
