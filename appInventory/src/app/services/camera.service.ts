import { Injectable } from '@angular/core';
import {
  Camera,
  CameraPhoto,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Dir } from 'fs';
import { PhotoIf } from '../models/photo.interface';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  // Arreglo para almacenar fotos
  public picture: PhotoIf[] = [];
  private PHOTO_STORAGE: string = 'photos';

  constructor() {}

  public async addNewPhoto() {
    // Tomar foto
    const capture = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    // this.picture.unshift({
    //   filepath: 'prod_',
    //   webviewPath: capture.webPath,
    // });

    const savedPicture = await this.savePicture(capture);
    this.picture.unshift(savedPicture);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.picture),
    });
  }

  public async savePicture(cameraPhoto: CameraPhoto) {
    // Convertie la foto a base64
    const base64Data = await this.readAsBase64(cameraPhoto);
    // Escribir la foto en el directorio
    const fileName = new Date().getTime + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });
    // Retorno de la funcion
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath,
    };
  }

  public async readAsBase64(cameraPhoto: CameraPhoto) {
    // Convertir de blob a base64
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();

    return (await this.convertBlobToBase64(blob)) as string;
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  public async loadSaved() {
    // Recuperar las fotos de la cache
    const listPicture = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.picture = JSON.parse(listPicture.value!) || [];

    // Desplegar las fotos leidas en formato base64
    for (let foto of this.picture) {
      // Leer cada foto almacenada en el sistema de archivos
      const readFile = await Filesystem.readFile({
        path: foto.filepath,
        directory: Directory.Data,
      });

      // Solo para plataforma web: Cargar lasd fotos en base64
      foto.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
  }
}
