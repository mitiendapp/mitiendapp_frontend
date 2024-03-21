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
import { NextFunction } from 'express';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  public webhook = new BehaviorSubject(null);
  private endpoint: string;
  private frontEndpoint: string;
  private apiUrl: string;
  private product = {
    product: {
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
      quantity: 1
    },
    payer: {}
  }
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6ImYxM2Y5MWQ1LTZjOWItNDU0Ny05Y2M4LTFjM2U0ZTIxODFhYSIsImVtYWlsIjoic2FudGlhZ29vc29yaW8zMTBAZ21haWwuY29tIiwicm9sZXMiOlsieyIsIlwiIiwiQyIsIm8iLCJtIiwicCIsImEiLCJuIiwieSIsIlwiIiwiOiIsIjQiLCIwIiwiNiIsIjgiLCJ9Il19LCJpYXQiOjE3MDk1MTA3ODAsImV4cCI6MTcxMjEwMjc4MH0.xiIBlTuIlEkmnpsCY7-xEvsz2FzfItefBNXkn3W9BU4"
  });

  constructor(
    private http: HttpClient,
    private perfilService: PerfilUsuarioService,
    private userService: UserService
  ) {
    this.endpoint = enviroment.endpoint;
    this.frontEndpoint = enviroment.front_endpoint;
    this.apiUrl = 'order';
  }

  async prepareOrder(data: Product) {
    // console.log(this.perfilCompanyService.getCompany());
    const client = await decodeJWT(localStorage.getItem('token')).UserInfo;
    console.log(client);
    const payer = await firstValueFrom(this.perfilService.getClient(client.email));
    const product = {
      category: data.category,
      description: data.description,
      image: this.formatImage(data.image),
      name: data.name,
      price: data.price * 100,
      stock: data.stock,
      id: data.id,
      companyId: data.companyId,
      quantity: 1
    }
    const payload = {
      product,
      payer
    }
    return payload
  }
  createOrder(data): Observable<any> {
    return this.http.post(`${this.endpoint}wompi/payment/create`, data);
  }

  private formatImage(url: string) {
    return url.replace('upload', 'upload/w_450,c_scale');
  }

  onWebhook():Observable<any>{
    return this.webhook.asObservable();
  }
  
  private secret = "test_events_Du22wRnRmlltx7Tm3iY7ltWT8GLWXsTf";
  
   receiveWebhook = async (req: Request, res: Response, next: NextFunction) => {
    const {data, environment, event, sent_at, signature, timestamp}: any = req.body;
    try {
      const properties = signature.properties.map((e: string) => e.split('.'));
      let newP = properties.map((property) => {
        return (data[property[0]][property[1]]);
        
      }).reduce((prev, curr) => prev + curr);
      newP += timestamp;
      newP += this.secret;
      const mySha = await this.sha256(newP);
      if (signature.checksum === mySha) {
        if (event == 'transaction.updated') {
          
        } else if (event == 'nequi_token.updated') {
          // on nequi token updated
        }
        console.log(data);
        
      } else {
        throw new Error('Signature insecure');
      };
    } catch (err) {
      console.log(err);
    }
  }
  orderSuccess = async (req: Request, res: Response, next: NextFunction) => {
    window.location.href = `${this.frontEndpoint}/success`;
  }
   orderFailure = async (req: Request, res: Response, next: NextFunction) => {
    window.location.href = `${this.endpoint}/failure`;
  }
 rderPending = async (req: Request, res: Response, next: NextFunction) => {
    window.location.href = `${this.endpoint}/pending`;
  }
  
   sha256 = async (message)=> {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  
}