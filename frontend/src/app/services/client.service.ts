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
  private _purchases = new BehaviorSubject<any[]>(null); 
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
    this.endpoint = enviroment.endpoint;
    this.apiUrl = 'client';
    this.auxList = [];
    this.productPurchased(this.product);
    this.productPurchased(this.product);
    this.productPurchased(this.product);
    this.productPurchased(this.product);
    this.productPurchased(this.product);
    this.productPurchased(this.product);
  }

  find(email: any):Observable<any>{
    return this.http.get(`${this.endpoint}${this.apiUrl}/${email}`);
  }

  
  get purchases():Observable<any>{
    return this._purchases.asObservable();
  }
  
  productPurchased(product:ProductDTO){
    console.log(product);
    
    this.auxList.push(product)
    this._purchases.next(this.auxList);
  }
}
