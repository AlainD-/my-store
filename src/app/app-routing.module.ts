import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IsAuthenticatedGuard } from './core/guards/is-authenticated.guard';
import { IsAdminGuard } from './core/guards/is-admin.guard';

const routes: Routes = [
  { path: 'not-found', component: NotFoundComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'profile',
        canActivate: [IsAuthenticatedGuard],
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'cart',
        canActivate: [IsAuthenticatedGuard],
        loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'admin',
        canActivate: [IsAdminGuard],
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
      },
      { path: '', pathMatch: 'full', redirectTo: '/products' },
    ],
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
