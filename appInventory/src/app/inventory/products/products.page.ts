import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '../../services/products.service';

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
    private productsService: ProductsService
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
    const data = await this.productsService.getProdImages();
    data.subscribe(async (dt: any) => {
      const code = dt.code;
      if (code === 'SUCCESS') {
        const obj = dt.object;
        console.log(obj);
        this.listProducts = obj;
        this.qty = obj.length;
      } else {
        console.log('ERROR');
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
