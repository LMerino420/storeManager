import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  API_URI = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.API_URI}/listCategory`);
  }

  getCategory(id: string) {
    return this.http.get(`${this.API_URI}/category/${id}`);
  }

  addCategory(category: any) {
    return this.http.post(`${this.API_URI}/newCategory`, category);
  }

  editCategory(id: string, update: any) {
    return this.http.put(`${this.API_URI}/updateCategory/${id}`, update);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.API_URI}/deleteCategory/${id}`);
  }
}
