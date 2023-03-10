import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //* ----------------------------------------- TABLA DE GASTOSPRODUCTO
  // Obtener el total de gastos
  getExpenses() {
    return this.http.get(`${this.API_URI}/expenses`);
  }

  // Obtner el detalle de los gastos
  getExpensesDetail() {
    return this.http.get(`${this.API_URI}/expensesDetail`);
  }

  //* ----------------------------------------- TABLA DE USUARIOS
  // Crear usuario
  createUser(user: any) {
    return this.http.post(`${this.API_URI}/auth/registUser`, user);
  }
}
