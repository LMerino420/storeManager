import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormEditPageRoutingModule } from './form-edit-routing.module';

import { FormEditPage } from './form-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormEditPageRoutingModule,
  ],
  declarations: [FormEditPage],
})
export class FormEditPageModule {}
