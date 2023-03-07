import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./inventory/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./inventory/categories/categories.module').then(
        (m) => m.CategoriesPageModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./inventory/products/products.module').then(
        (m) => m.ProductsPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./auth/landing/landing.module').then((m) => m.LandingPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
