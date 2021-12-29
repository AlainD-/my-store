import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from '../core/core.module';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [ProductsComponent, CategoriesComponent, UsersComponent, OrdersComponent],
  imports: [CommonModule, AdminRoutingModule, CoreModule, FormsModule],
})
export class AdminModule {}
