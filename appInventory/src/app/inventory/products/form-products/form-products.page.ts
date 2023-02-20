import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  listCategories: any = [];

  image: string = '';
  imgUrl: string = '';

  constructor(
    private router: Router,
    // public cameraService: CameraService,
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private commons: Commons
  ) {}

  async ngOnInit() {
    // await this.cameraService.loadSaved();
    await this.getListCategories();
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  // TOMAR FOTO DESDE LA CAMARA
  // takePhoto() {
  //   this.cameraService.addNewPhoto();
  // }

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
      console.log('image', this.image);
    }
  }

  //* METODO PARA SUBIR IMAGEN
  async onSubmit() {
    const formData = new FormData();
    formData.append('file', this.image);
    const data = await this.productService.uploadImage(formData);
    data.subscribe((dt: any) => {
      const code = dt.code;
      console.log(dt);
      if (code === 'SUCCESS') {
        Swal.fire({
          heightAuto: false,
          icon: 'success',
          title: 'File uploaded',
          text: 'The file has been uploaded correctly!',
        }).then((res) => {
          if (res) {
            location.reload();
          }
        });
      } else {
        Swal.fire({
          heightAuto: false,
          icon: 'error',
          title: 'File failed to load',
          text: 'An error occurred while trying to upload the file!',
        });
      }
    });
  }
}