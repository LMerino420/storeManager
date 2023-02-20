import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

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
}
