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

  getProducts():Observable<Product[]>{//listar productos
    return this.http.get<Product[]>(`${this.endpoint}${this.apiUrl}`);
  }
  getProductById(id:number):Observable<any>{
    return this.http.get<any>(`${this.endpoint}product/id?id=${id}`);
  }
  create(product:Product):Observable<any>{
    return this.http.post(`${this.endpoint}${this.apiUrl}`, product)
  }
<<<<<<< HEAD
  
=======

  deleteProdcuts(product:Product):Observable<void>{
   return this.http.post<void>(`${this.endpoint}${'product/delete'}`,product)
  } 
  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${this.endpoint}`,product)
  }

>>>>>>> 5dbf5548ddadaf1d6e2a7a94da7796117f213dfa
}
