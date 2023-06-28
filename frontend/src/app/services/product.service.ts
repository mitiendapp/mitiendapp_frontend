import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private endpoint:string;
  private apiUrl:string;

  constructor(private http:HttpClient) {
    this.endpoint= enviroment.endpoint;
    this.apiUrl= 'product';
   }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.endpoint}${this.apiUrl}`);
  }
  getProductById(id:number):Observable<any>{
    return this.http.get<any>(`${this.endpoint}test/?id=${id}`);
  }
  create(product:Product):Observable<any>{
    return this.http.post(`${this.endpoint}${this.apiUrl}`, product)
  }
}
