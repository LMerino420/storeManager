import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';

// import { CameraService } from '../../../services/camera.service';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { Commons } from '../../../commons';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.page.html',
  styleUrls: ['./form-products.page.scss'],
})
export class FormProductsPage implements OnInit {
  @ViewChild('accordionGroup', { static: true }) accordionGroup:
    | IonAccordionGroup
    | any;

  accordionDisabled: boolean = true;
  formProd: FormGroup;
  formCost: FormGroup;

  listCategories: any = [];
  image: string = '';
  imgUrl: string = '';

  constructor(
    private router: Router,
    private commons: Commons,
    private formBuilder: FormBuilder,
    // public cameraService: CameraService,
    private categoriesService: CategoriesService,
    private productService: ProductsService
  ) {
    //* Declarar formulario para productos
    this.formProd = this.formBuilder.group({
      prodNombre: ['', [Validators.required]],
      prodDescripcion: [''],
      codCategoria: ['', [Validators.required]],
      prodEstado: ['STOCK'],
    });
    //* Declarar formulario para costos del producto
    this.formCost = this.formBuilder.group({
      // codProducto: [1],
      codProducto: ['', [Validators.required]],
      prodPrecio: ['', [Validators.required]],
      costoLiberacion: [0],
      costoEnvio: [0],
      costoRepuestos: [0],
      costoReparacion: [0],
      costoTotal: [0],
    });
  }

  async ngOnInit() {
    // await this.cameraService.loadSaved();
    await this.getListCategories();
  }

  // TOMAR FOTO DESDE LA CAMARA
  // takePhoto() {
  //   this.cameraService.addNewPhoto();
  // }

  //* ---------------------------------- GETTER INPUTS formProd
  get codCategoria() {
    return this.formProd.get('codCategoria');
  }

  get prodNombre() {
    return this.formProd.get('prodNombre');
  }

  get prodDescripcion() {
    return this.formProd.get('prodDescripcion');
  }
  //* ---------------------------------- GETTER INPUTS formCost
  get codProducto() {
    return this.formCost.get('codProducto');
  }

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

  //* Regresar a la pagina anterior
  goBack() {
    this.router.navigate(['/products']);
    this.clearFormProd();
    this.clearFormCosts();
  }

  //* Deshabilitar inputs de formulario de informacion del producto
  disableFormProd() {
    this.codCategoria?.disable();
    this.prodNombre?.disable();
    this.prodDescripcion?.disable();
  }

  //* Habilitar input de formulario de informacion del producto
  enableFormProd() {
    this.codCategoria?.enable();
    this.prodNombre?.enable();
    this.prodDescripcion?.enable();
  }

  //* Limpiar formulario de informacion del producto
  clearFormProd() {
    this.accordionDisabled = true;
    this.codCategoria?.reset();
    this.prodNombre?.reset();
    this.prodDescripcion?.reset();
    this.clearImg();
  }

  //* Limpiar imagen
  clearImg() {
    this.image = '';
    this.imgUrl = '';
  }

  //* Limpiar formulario de costos del producto
  clearFormCosts() {
    this.codProducto?.reset();
    this.prodPrecio?.reset();
    this.costoLiberacion?.reset();
    this.costoEnvio?.reset();
    this.costoRepuestos?.reset();
    this.costoReparacion?.reset();
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

  //* Toggle accordion
  toggleAccordion = () => {
    const nativeEl = this.accordionGroup;
    if (nativeEl.value === 'second') {
      nativeEl.value = 'first';
    } else {
      nativeEl.value = 'second';
    }
  };

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
      } else {
        console.log('ERROR');
      }
    });
  }

  //* CREAR NUEVO PRODUCTO
  async addProduct() {
    if (this.formProd.valid && this.image && this.imgUrl) {
      let params = this.formProd.value;
      const data = await this.productService.addProduct(params);
      data.subscribe(async (dt: any) => {
        const code = dt.code;
        if (code === 'SUCCESS') {
          const obj = dt.object.insertId;
          if (obj) {
            await this.uploadImage(obj);
          }
        } else {
          await this.commons.errorAlert(
            'An error occurred while saving product!'
          );
        }
      });
    } else {
      this.formProd.markAllAsTouched();
      await this.commons.infoAlert('There are incomplete fields!');
    }
  }

  //* MOSTRAR IMAGEN CARGADA
  selectImg(ev: Event | any) {
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (ev: any) => {
        this.imgUrl = ev.target.result;
      };

      this.image = file;
    }
  }

  //* METODO PARA SUBIR IMAGEN
  async uploadImage(idProduct: string) {
    await this.commons.showLoader('Saving product...');
    const formData = new FormData();
    formData.append('file', this.image);
    const data = await this.productService.uploadImage(idProduct, formData);
    data.subscribe(async (dt: any) => {
      await this.commons.hideLoader();
      const code = dt.code;
      console.log(dt);
      if (code === 'SUCCESS') {
        this.codProducto?.setValue(idProduct);
        this.accordionDisabled = false;
        this.disableFormProd();
        this.toggleAccordion();
      } else {
        await this.commons.errorAlert(
          'An error occurred while saving the product image!'
        );
      }
    });
  }

  //* METODO PARA GUARDAR LOS COSTOS DEL PRODUCTO
  async addCost() {
    if (this.formCost.valid) {
      const tot = this.totalCost();
      this.costoTotal?.setValue(tot);
      let params = this.formCost.value;
      const data = await this.productService.addCosts(params);
      data.subscribe(async (dt: any) => {
        const code = dt.code;
        if (code === 'SUCCESS') {
          const msj = 'Data saved successfully.';
          await this.commons.successAlert(msj);
          this.clearFormProd();
          this.clearFormCosts();
          this.enableFormProd();
          this.toggleAccordion();
        } else {
          await this.commons.errorAlert();
        }
      });
      console.log(params);
    } else {
      this.formCost.markAllAsTouched();
    }
  }
}
