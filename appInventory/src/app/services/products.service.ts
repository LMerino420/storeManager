import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  API_URI = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  uploadImage(image: any) {
    return this.http.post(`${this.API_URI}/uploadImage`, image);
  }
}
