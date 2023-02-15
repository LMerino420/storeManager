import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CategoriesService } from '../../services/categories.service';

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
    private categoriesService: CategoriesService
  ) {}

  async ngOnInit() {
    await this.getListCategories();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  // OBTENER LISTA DE CATEGORIAS
  async getListCategories() {
    const data = await this.categoriesService.getCategories();
    data.subscribe((dt: any) => {
      const code = dt.code;
      if (code === 'SUCCESS') {
        const obj = dt.object;
        this.listCategories = obj;
        this.qty = obj.length;
      } else {
        console.log('ERROR');
      }
    });
  }

  // AGREGAR UNA CATEGORIA
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
                await this.getListCategories();
              } else {
                console.log('ERROR');
              }
            });
          },
        },
      ],
    });

    await alert.present();
  }

  // OBTENER DATOS DE CATEGORIA
  async getCategory(cod: string) {
    const data = await this.categoriesService.getCategory(cod);
    data.subscribe((r: any) => {
      const code = r.code;
      if (code === 'SUCCESS') {
        const obj = r.object;
        this.editCategory(cod, obj.categNombre);
      } else {
        console.log('ERROR');
      }
    });
  }

  // EDITAR UNA CATEGORIA
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
              if (code === 'SUCCESS') {
                await this.getListCategories();
              } else {
                console.log('ERROR');
              }
            });
          },
        },
      ],
    });
    await alert.present();
  }

  // ELIMINAR UNA CATEGORIA
  async deleteCategory(id: string, cat: string) {
    const alert = await this.alertController.create({
      header: 'Do you want to delete ' + cat + ' ?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
        },
        {
          text: 'YES, DELETE',
          role: 'confirm',
          handler: async () => {
            await this.delete(id);
          },
        },
      ],
    });

    await alert.present();
  }

  async delete(id: string) {
    const data = await this.categoriesService.deleteCategory(id);
    data.subscribe(async (dt: any) => {
      const code = dt.code;
      if (code === 'SUCCESS') {
        await this.getListCategories();
      } else {
        console.log('ERROR');
      }
    });
  }
}
