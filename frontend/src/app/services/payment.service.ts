import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private endpoint: string;
  private apiUrl:string;

  constructor(private http: HttpClient) {
    this.endpoint = enviroment.endpoint;
    this.apiUrl = 'order';
   }

  createOrder(){
    return this.http.post(`${this.endpoint}${this.apiUrl}/create`,{}) 
  }

}
