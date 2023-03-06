import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { CategoriesService } from '../../services/categories.service';
import { Commons } from '../../commons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  qty: any = 0;
  listCategories: any = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private categoriesService: CategoriesService,
    private commons: Commons
  ) {}

  async ngOnInit() {
    await this.getListCategories();
  }

  //* REDIRECCIONAR A HOME
  goHome() {
    this.router.navigate(['/home']);
  }

  //* OBTENER LISTA DE CATEGORIAS
  async getListCategories() {
    await this.commons.showLoader('Getting categories');
    const data = await this.categoriesService.getCategories();
    data.subscribe(async (dt: any) => {
      await this.commons.hideLoader();
      const code = dt.code;
      if (code === 'SUCCESS') {
        const obj = dt.object;
        this.listCategories = obj;
        this.qty = obj.length;
      } else {
        await this.commons.errorAlert();
      }
    });
  }

  //* AGREGAR UNA CATEGORIA
  async addCategory() {
    const alert = await this.alertController.create({
      header: 'Create new category',
      inputs: [
        {
          name: 'catName',
          type: 'text',
          placeholder: 'Name category',
        },
      ],
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
        },
        {
          text: 'CREATE',
          handler: async (val) => {
            let params = new HttpParams();
            params = params.set('categNombre', val.catName);
            const dt = await this.categoriesService.addCategory(params);
            dt.subscribe(async (r: any) => {
              const code = r.code;
              if (code === 'SUCCESS') {
                await this.commons.successAlert('Category added successfully.');
                await this.getListCategories();
              } else {
                await this.commons.errorAlert();
              }
            });
          },
        },
      ],
    });

    await alert.present();
  }

  //* OBTENER DATOS DE CATEGORIA
  async getCategory(cod: string) {
    await this.commons.showLoader('Getting data');
    const data = await this.categoriesService.getCategory(cod);
    data.subscribe(async (r: any) => {
      await this.commons.hideLoader();
      const code = r.code;
      if (code === 'SUCCESS') {
        const obj = r.object;
        this.editCategory(cod, obj.categNombre);
      } else {
        await this.commons.errorAlert();
      }
    });
  }

  //* EDITAR UNA CATEGORIA
  async editCategory(id: string, val: string) {
    const alert = await this.alertController.create({
      header: 'Edit category',
      inputs: [
        {
          name: 'catName',
          type: 'text',
          value: val,
        },
      ],
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
        },
        {
          text: 'SAVE',
          handler: async (val) => {
            let params = new HttpParams();
            params = params.set('categNombre', val.catName);
            const dt = await this.categoriesService.editCategory(id, params);
            dt.subscribe(async (r: any) => {
              const code = r.code;
              console.log(code);
              if (code === 'SUCCESS') {
                await this.commons.successAlert(
                  'Category updated successfully.'
                );
                await this.getListCategories();
              } else {
                await this.commons.errorAlert();
              }
            });
          },
        },
      ],
    });
    await alert.present();
  }

  //* CONFIRMACION DE ELIMINACION
  deleteCategory(id: string, cat: string) {
    Swal.fire({
      heightAuto: false,
      title: 'Do you want to delete ' + cat + ' ?',
      showDenyButton: true,
      confirmButtonText: 'YES, DELETE',
      denyButtonText: 'CANCEL',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.delete(id);
      }
    });
  }

  //* ELIMINAR CATEGORIA
  async delete(id: string) {
    const data = await this.categoriesService.deleteCategory(id);
    data.subscribe(async (dt: any) => {
      const code = dt.code;
      if (code === 'SUCCESS') {
        await this.commons.successAlert('Category deleted successfully.');
        await this.getListCategories();
      } else {
        await this.commons.errorAlert();
      }
    });
  }
}
