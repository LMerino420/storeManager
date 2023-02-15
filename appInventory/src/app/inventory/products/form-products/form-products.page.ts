import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CameraService } from '../../../services/camera.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.page.html',
  styleUrls: ['./form-products.page.scss'],
})
export class FormProductsPage implements OnInit {
  constructor(private router: Router, public cameraService: CameraService) {}

  async ngOnInit() {
    await this.cameraService.loadSaved();
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  takePhoto() {
    this.cameraService.addNewPhoto();
  }
}
