import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormProductsPageRoutingModule } from './form-products-routing.module';

import { FormProductsPage } from './form-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormProductsPageRoutingModule,
  ],
  declarations: [FormProductsPage],
})
export class FormProductsPageModule {}
