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
  private create1:string;
  //private create1:string;

  constructor(private http:HttpClient) {
    this.endpoint= enviroment.endpoint;
    this.apiUrl= 'product';
   this.create1 = '/create'
   }

  getProducts():Observable<Product[]>{//listar productos
    return this.http.get<Product[]>(`${this.endpoint}${this.apiUrl}`);
  }
  getProductById(id:number):Observable<any>{//listar productos por id
    return this.http.get<any>(`${this.endpoint}product/id?id=${id}`);
  }
  create(product:Product):Observable<any>{//crear productos
    return this.http.post<any>(`${this.endpoint}${this.apiUrl}${this.create1}`, product)
  }

  deleteProdcuts(product:Product):Observable<void>{
   return this.http.post<void>(`${this.endpoint}${'product/delete'}`,product)
  } 
  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${this.endpoint}`,product)
  }

}
