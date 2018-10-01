import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://pandayg-api.azurewebsites.net/';
  constructor(private http: HttpClient) { }
 
  getConfig(phoneNumber, password) {
    return this.http.post(this.baseUrl+"v1/auth/signin",
        {
            "phoneNumber":phoneNumber,
            "password":password
        });       
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl+"v1/public/fetchAllProducts?business=592400470f2f7c30242a8646&limit=1000&page=0");
  }
  
}