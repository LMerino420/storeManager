import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
  },
  {
    path: 'form-products',
    loadChildren: () =>
      import('./form-products/form-products.module').then(
        (m) => m.FormProductsPageModule
      ),
  },
  {
    path: 'form-edit/:id',
    loadChildren: () =>
      import('./form-edit/form-edit.module').then((m) => m.FormEditPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
