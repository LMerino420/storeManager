import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  API_URI = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  //* ----------------------------------------- TABLA DE IMAGENES
  // Subir imagen al servidor y bdo
  uploadImage(id: string, image: any) {
    return this.http.post(`${this.API_URI}/uploadImage/${id}`, image);
  }

  // Obtener lista de productos con imagen
  getProdImages() {
    return this.http.get(`${this.API_URI}/prodImg`);
  }

  // Eliminar un producto y su imagen
  deleteProduct(id: string) {
    return this.http.get(`${this.API_URI}/deleteImg/${id}`);
  }

  //* ----------------------------------------- TABLA DE PRODUCTOS
  // Crear un nuevo producto
  addProduct(product: any) {
    return this.http.post(`${this.API_URI}/newProduct`, product);
  }

  //* ----------------------------------------- TABLA DE GASTOSPRODUCTO
  addCosts(cost: any) {
    return this.http.post(`${this.API_URI}/saveCosts`, cost);
  }
}
