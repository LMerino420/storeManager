import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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

  formProd: FormGroup;
  formCost: FormGroup;
  prodId: string | null = null;

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
      // codProducto: [this.prodId],
      codProducto: [1],
      prodPrecio: ['', [Validators.required]],
      costoLiberacion: [''],
      costoEnvio: [''],
      costoRepuestos: [''],
      costoReparacion: [''],
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

  //* Regresar a la pagina anterior
  goBack() {
    this.router.navigate(['/products']);
    this.clearFormProd();
  }

  //* Limpiar formulario de informacin del producto
  clearFormProd() {
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
    this.prodId = null;
    this.prodPrecio?.reset();
    this.costoLiberacion?.reset();
    this.costoEnvio?.reset();
    this.costoRepuestos?.reset();
    this.costoReparacion?.reset();
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
    if (this.formProd.valid) {
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
          Swal.fire({
            heightAuto: false,
            icon: 'error',
            title: 'Error saving',
            text: 'An error occurred while saving product!',
          });
        }
      });
      console.log(this.formProd.value);
    } else {
      this.formProd.markAllAsTouched();
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
        Swal.fire({
          heightAuto: false,
          icon: 'success',
          title: 'Product saved',
          text: 'Product stored successfully!',
        }).then((res) => {
          if (res) {
            this.prodId = idProduct;
            console.log('prodId =>', this.prodId);
            this.toggleAccordion();
          }
        });
      } else {
        Swal.fire({
          heightAuto: false,
          icon: 'error',
          title: 'Error saving',
          text: 'An error occurred while saving product!',
        });
      }
    });
  }

  //* METODO PARA GUARDAR LOS COSTOS DEL PRODUCTO
  async addCost() {
    if (this.formCost.valid) {
      let params = this.formCost.value;
      const data = await this.productService.addCosts(params);
      data.subscribe(async (dt: any) => {
        const code = dt.code;
        if (code === 'SUCCESS') {
          const msj = 'Data saved successfully.';
          await this.commons.successAlert(msj);
          this.clearFormCosts();
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
