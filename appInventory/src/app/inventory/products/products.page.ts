import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  qty: any = 0;

  constructor(private router: Router) {}

  ngOnInit() {}

  goHome() {
    this.router.navigate(['/home']);
  }

  addProduct() {
    this.router.navigate(['/products/form-products']);
  }
}
