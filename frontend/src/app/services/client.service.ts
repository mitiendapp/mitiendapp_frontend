import { Injectable } from '@angular/core';
import { Router } from 'express';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { ProductDTO } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private endpoint: string;
  private apiUrl: string;
  private apiUrlclientes: string;
  private _purchases = new BehaviorSubject<ProductDTO[]>(null); 
  auxList:ProductDTO[];
  product:ProductDTO = {
    category: "", 
    description: "",
    image: "",
    name: "s",
    price: 150000,
    quantity:1,
    stock:2,
    companyId:"2",
    id:1
  };
  constructor(private http: HttpClient){
    this.apiUrlclientes = 'clients';
    this.endpoint = enviroment.endpoint;
    this.apiUrl = 'client';

    this.auxList = [];
  }

  find(email: any):Observable<any>{
    return this.http.get(`${this.endpoint}${this.apiUrl}/${email}`);
  }

  getClients():Observable<any>{
    return this.http.get(`${this.endpoint}${this.apiUrlclientes}`);
  }
  
  purchases():Observable<ProductDTO[]>{
    return this._purchases.asObservable();
  }
  
  productPurchased(product:any){
    console.log(this.auxList);
    
    this.auxList.push(product)
    
    console.log(this.auxList);
    
    this._purchases.next(this.auxList);
  }
}
