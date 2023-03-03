import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  //* Obtener lista de productos
  async getListProducts() {
    await this.commons.showLoader('Getting products');
    const data = await this.productsService.getProdImages();
    data.subscribe(async (dt: any) => {
      await this.commons.hideLoader();
      const code = dt.code;
      if (code === 'SUCCESS') {
        const obj = dt.object;
        console.log(obj);
        this.listProducts = obj;
        this.qty = obj.length;
      } else {
        await this.commons.infoAlert('No registered products found!');
      }
    });
  }

  // Eliminar producto
  async testDelete(id: string) {
    console.log('id =>', id);
    const data = await this.productsService.deleteProduct(id);
    data.subscribe(async (dt: any) => {
      console.log('dt =>', dt);
    });
  }
}
