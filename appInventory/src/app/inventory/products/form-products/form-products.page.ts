import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  form: FormGroup;

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
    //* Declarar formulario reactivo
    this.form = this.formBuilder.group({
      prodNombre: ['', [Validators.required]],
      prodPrecio: ['', [Validators.required]],
      prodDescripcion: [''],
      codCategoria: ['', [Validators.required]],
      prodEstado: ['STOCK'],
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

  //* ---------------------------------- GETTER INPUTS
  get codCategoria() {
    return this.form.get('codCategoria');
  }

  get prodNombre() {
    return this.form.get('prodNombre');
  }

  get prodPrecio() {
    return this.form.get('prodPrecio');
  }

  get prodDescripcion() {
    return this.form.get('prodDescripcion');
  }
  //* ---------------------------------- GETTER INPUTS

  //* Regresar a la pagina anterior
  goBack() {
    this.router.navigate(['/products']);
    this.clearForm();
  }

  //* Limpiar formulario
  clearForm() {
    this.codCategoria?.reset();
    this.prodNombre?.reset();
    this.prodPrecio?.reset();
    this.image = '';
    this.imgUrl = '';
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
      } else {
        console.log('ERROR');
      }
    });
  }

  //* CREAR NUEVO PRODUCTO
  async addProduct() {
    if (this.form.valid) {
      let params = this.form.value;
      const data = await this.productService.addProduct(params);
      data.subscribe(async (dt: any) => {
        const code = dt.code;
        if (code === 'SUCCESS') {
          const obj = dt.object.insertId;
          console.log('OBJ =>', obj);
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
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
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
            this.clearForm();
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
}
