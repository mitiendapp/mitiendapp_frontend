import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private endpoint:string;
  private apiUrl:string;
  
  constructor(private http:HttpClient) {
    this.endpoint= enviroment.endpoint;
    this.apiUrl= 'cart';
   }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.endpoint}${this.apiUrl}/get`);
  }

  create(product:Product):Observable<any>{
    return this.http.post(`${this.endpoint}${this.apiUrl}/add`, product)
  }
}
