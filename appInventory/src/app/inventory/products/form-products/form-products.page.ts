import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CameraService } from '../../../services/camera.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.page.html',
  styleUrls: ['./form-products.page.scss'],
})
export class FormProductsPage implements OnInit {
  title: string = '';
  image: string = '';
  imgUrl: string = '';

  constructor(
    private router: Router,
    public cameraService: CameraService,
    private productService: ProductsService
  ) {}

  async ngOnInit() {
    await this.cameraService.loadSaved();
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  takePhoto() {
    this.cameraService.addNewPhoto();
  }

  // CARGANDO IMAGEN CON INPUT FILE
  selectImg(ev: Event | any) {
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (ev: any) => {
        this.imgUrl = ev.target.result;
        console.log('imageURL', this.imgUrl);
      };

      this.image = file;
      console.log('image', this.image);
    }
  }

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
