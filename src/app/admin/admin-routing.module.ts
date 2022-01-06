import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from '../core/guards/is-admin.guard';
import { AdminComponent } from './admin/admin.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [IsAdminGuard],
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'orders', component: OrdersComponent },
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      { path: '**', redirectTo: '/not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
