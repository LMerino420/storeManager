import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Commons } from '../../../commons';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.page.html',
  styleUrls: ['./form-edit.page.scss'],
})
export class FormEditPage implements OnInit {
  codProd: string | any;
  imgUrl: any;
  detailProduct: any = [];
  formCost: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private commons: Commons,
    private formBuilder: FormBuilder
  ) {
    //* Declarar formulario para costos del producto
    this.formCost = this.formBuilder.group({
      prodPrecio: [''],
      costoLiberacion: [''],
      costoEnvio: [''],
      costoRepuestos: [''],
      costoReparacion: [''],
      costoTotal: [''],
    });
  }

  async ngOnInit() {
    this.codProd = this.activatedRoute.snapshot.params['id'];
    await this.getProductDetail();
    console.log('ID =>', this.codProd);
  }

  //* ---------------------------------- GETTER INPUTS formCost
  get prodPrecio() {
    return this.formCost.get('prodPrecio');
  }

  get costoLiberacion() {
    return this.formCost.get('costoLiberacion');
  }

  get costoEnvio() {
    return this.formCost.get('costoEnvio');
  }

  get costoRepuestos() {
    return this.formCost.get('costoRepuestos');
  }

  get costoReparacion() {
    return this.formCost.get('costoReparacion');
  }

  get costoTotal() {
    return this.formCost.get('costoTotal');
  }

  //* ---------------------------------- SET VALUES formCost
  setValuesForm() {
    this.prodPrecio?.setValue(this.detailProduct.prodPrecio);
    this.costoLiberacion?.setValue(this.detailProduct.costoLiberacion);
    this.costoEnvio?.setValue(this.detailProduct.costoEnvio);
    this.costoRepuestos?.setValue(this.detailProduct.costoRepuestos);
    this.costoReparacion?.setValue(this.detailProduct.costoReparacion);
    // console.log('FORM =>', this.formCost.value);
  }

  //* Suma del costo total
  totalCost() {
    const total =
      this.prodPrecio?.value +
      this.costoLiberacion?.value +
      this.costoEnvio?.value +
      this.costoRepuestos?.value +
      this.costoReparacion?.value;
    return total;
  }

  //* Regresar a la pagina anterior
  goBack() {
    this.router.navigate(['/products']);
  }

  //* Obtener datos del producto
  async getProductDetail() {
    await this.commons.showLoader('Getting product details');
    const data = await this.productsService.getProductDetail(this.codProd);
    data.subscribe(async (dt: any) => {
      await this.commons.hideLoader();
      console.log(dt);
      const code = dt.code;
      if (code === 'SUCCESS') {
        const obj = dt.object[0];
        this.detailProduct = obj;
        this.setValuesForm();
        console.log(this.detailProduct);
      } else {
        await this.commons.infoAlert('No details found for this product!');
      }
    });
  }

  // Actualizar costos del producto
  async updateCosts() {
    const tot = this.totalCost();
    this.costoTotal?.setValue(tot);
    const params = this.formCost.value;
    const data = await this.productsService.updateCosts(this.codProd, params);
    data.subscribe(async (dt: any) => {
      const code = dt.code;
      if (code === 'SUCCESS') {
        const msj = 'Data saved successfully.';
        await this.commons.successAlert(msj);
        await this.getProductDetail();
      } else {
        await this.commons.errorAlert();
      }
    });
  }
}
