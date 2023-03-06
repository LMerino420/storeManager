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

  //* ----------------------------------------- TABLA DE PRODUCTOS
  // Crear un nuevo producto
  addProduct(product: any) {
    return this.http.post(`${this.API_URI}/newProduct`, product);
  }

  // Eliminar un producto y su imagen
  deleteProduct(id: string) {
    return this.http.get(`${this.API_URI}/deleteImg/${id}`);
  }

  //* ----------------------------------------- TABLA DE GASTOSPRODUCTO
  // Añadir los costos del producto
  addCosts(cost: any) {
    return this.http.post(`${this.API_URI}/saveCosts`, cost);
  }

  // Obtener los costos del producto
  getProductDetail(id: string) {
    return this.http.get(`${this.API_URI}/getProductDetail/${id}`);
  }

  // Actualizar los costos del producto
  updateCosts(id: string, costs: any) {
    return this.http.put(`${this.API_URI}/updateCosts/${id}`, costs);
  }
}
