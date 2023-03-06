import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ProductsService } from '../../services/products.service';
import { Commons } from '../../commons';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  qty: any = 0;
  listProducts: any = [];

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private commons: Commons
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    await this.getListProducts();
  }

  //* Redireccionar a home
  goHome() {
    this.router.navigate(['/home']);
  }

  //* Redireccionar a formulario de productos
  addProduct() {
    this.router.navigate(['/products/form-products']);
  }

  //* Redireccionar a formulario de editar productos
  editProduct(id: string) {
    console.log('id prod =>', id);
    this.router.navigate(['/products/form-edit/']);
  }

  //* Obtener lista de productos
  async getListProducts() {
    await this.commons.showLoader('Getting products');
    const data = await this.productsService.getProdImages();
    data.subscribe(async (dt: any) => {
      await this.commons.hideLoader();
      const code = dt.code;
      if (code === 'SUCCESS') {
        const obj = dt.object;
        this.listProducts = obj;
        this.qty = obj.length;
      } else {
        await this.commons.infoAlert('No registered products found!');
      }
    });
  }

  //* Confirmacion de eliminacion
  confirmDelete(id: string, prod: string) {
    Swal.fire({
      heightAuto: false,
      title: 'Do you want to delete ' + prod + ' ?',
      showDenyButton: true,
      confirmButtonText: 'YES, DELETE',
      denyButtonText: 'CANCEL',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.deleteProduct(id);
      }
    });
  }

  //* Eliminar producto
  async deleteProduct(id: string) {
    console.log('id =>', id);
    const data = await this.productsService.deleteProduct(id);
    data.subscribe(async (dt: any) => {
      const code = dt.code;
      if (code === 'SUCCESS') {
        await this.commons.successAlert('Product successfully disposed');
        await this.getListProducts();
      } else {
        await this.commons.errorAlert();
      }
    });
  }
}
