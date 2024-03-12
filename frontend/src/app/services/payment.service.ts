import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
// import { or } from 'sequelize';
import { CompanyService } from './company.service';
import { PerfilCompanyService } from './perfil-company.service';
import { UserService } from './user.service';
import { PerfilUsuarioService } from './perfil-usuario.service';
import { decodeJWT } from '../utils/decodeJWT';
import { BehaviorSubject, Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { Client } from '../interfaces/client';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private endpoint: string;
  private apiUrl: string;
  private product = {
    product:{
      id: 1,
      name: "pollo",
      description: "pollito",
      price: 100,
      image: "https://res.cloudinary.com/dn4gw0ghk/image/upload/v1709877858/replit/s3yesomibs8xa1jnt9wp.jpg",
      stock: 200,
      category: "undefined",
      createdAt: "2024-03-08T06:04:38.000Z",
      updatedAt: "2024-03-08T06:04:38.000Z",
      companyId: 1,
      quantity:1
  },
  payer: {}
}
  private  headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6ImYxM2Y5MWQ1LTZjOWItNDU0Ny05Y2M4LTFjM2U0ZTIxODFhYSIsImVtYWlsIjoic2FudGlhZ29vc29yaW8zMTBAZ21haWwuY29tIiwicm9sZXMiOlsieyIsIlwiIiwiQyIsIm8iLCJtIiwicCIsImEiLCJuIiwieSIsIlwiIiwiOiIsIjQiLCIwIiwiNiIsIjgiLCJ9Il19LCJpYXQiOjE3MDk1MTA3ODAsImV4cCI6MTcxMjEwMjc4MH0.xiIBlTuIlEkmnpsCY7-xEvsz2FzfItefBNXkn3W9BU4"});

  constructor(
    private http: HttpClient,
    private perfilService: PerfilUsuarioService,
    private userService: UserService
  ) {
    this.endpoint = enviroment.endpoint;
    this.apiUrl = 'order';
  }

  async prepareOrder(data: Product) {
    // console.log(this.perfilCompanyService.getCompany());
    const client = await decodeJWT(localStorage.getItem('token')).UserInfo;
    
    const payer = await firstValueFrom(this.perfilService.getClient(client.email));
    const product = {
      category:data.category,
      description:data.description,
      image:data.image,
      name:data.name,
      price:data.price * 100,
      stock:data.stock,
      id:data.id,
      companyId:data.companyId,
      quantity:1
    } 
    const payload = {
      product,
      payer
    }
    return payload
  }
  createOrder(data):Observable<any>{
    
    return this.http.post(`${this.endpoint}wompi/payment/create`, data);
  }
}
