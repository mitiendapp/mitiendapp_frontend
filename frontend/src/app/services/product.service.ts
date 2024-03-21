import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private endpoint:string;
  private apiUrl:string;
  private create1:string;
  public currentProduct = new BehaviorSubject(null);

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
  create(productData: FormData):Observable<any>{//crear productos
    return this.http.post<any>(`${this.endpoint}${this.apiUrl}${this.create1}`, productData)
  }

  deleteProdcuts(product:Product):Observable<void>{
   return this.http.post<void>(`${this.endpoint}${'product/delete'}`,product)
  } 

  deleteProducts2(id:any):Observable<void>{
    return this.http.post<void>(`${this.endpoint}${'product/delete'}`,{id})
  }
  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${this.endpoint}`,product)
  }

  getProductsByCompanyId(companyId:string): Observable<any>{
    return this.http.get<any>(`${this.endpoint}${this.apiUrl}/companies/${companyId}`)
  }

  getProductId(id:any):Observable<any>{
    return this.http.get<any>(`${this.endpoint}product/id?id=${id}`)
  }

  myProduct():Observable<any>{
    return this.currentProduct.asObservable();
  }

  updateProduct(formData: FormData): Observable<any> {
    const url = `${this.endpoint}${this.apiUrl}/update`;
    return this.http.post<any>(url, formData); // Pasar 'product' como segundo argumento
  }
  
  

}
