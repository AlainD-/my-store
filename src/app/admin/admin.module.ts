import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from '../core/core.module';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { DeleteCategoryComponent } from './categories/components/delete-category/delete-category.component';
import { EditCategoryComponent } from './categories/components/edit-category/edit-category.component';
import { CreateCategoryComponent } from './categories/components/create-category/create-category.component';
import { DeleteUserComponent } from './users/components/delete-user/delete-user.component';

@NgModule({
  declarations: [
    ProductsComponent,
    CategoriesComponent,
    UsersComponent,
    OrdersComponent,
    DeleteCategoryComponent,
    EditCategoryComponent,
    CreateCategoryComponent,
    DeleteUserComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, CoreModule, FormsModule],
})
export class AdminModule {}
