import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class Commons {
  loader: any;

  constructor(private loadingCtrl: LoadingController) {}

  //* Mostrar loader
  async showLoader(msj = 'Loading, please wait...') {
    this.loader = await this.loadingCtrl
      .create({
        message: msj,
      })
      .then((res) => {
        res.present();
        res.onDidDismiss().then((dis) => {
          console.log('Dismissed loader');
        });
      });
  }

  //* Ocultar loader
  async hideLoader() {
    setTimeout(async () => {
      this.loader = await this.loadingCtrl.dismiss();
    }, 100);
  }

  //* Mostrar success alert
  async successAlert(message = 'Successful operation') {
    Swal.fire({
      heightAuto: false,
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  //* Mostrar error alert
  async errorAlert(message = 'An error has occurred') {
    Swal.fire({
      heightAuto: false,
      icon: 'error',
      title: 'Error!',
      text: message,
    });
  }

  //* Mostar info alert
  async infoAlert(message: string) {
    if (message) {
      Swal.fire({
        heightAuto: false,
        icon: 'info',
        title: 'Info!',
        text: message,
      });
    } else {
      console.log('No se ha establecido un mensaje para la alerta');
    }
  }
}
