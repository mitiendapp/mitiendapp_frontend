import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
// import { or } from 'sequelize';
import { CompanyService } from './company.service';
import { PerfilCompanyService } from './perfil-company.service';
import { UserService } from './user.service';
import { PerfilUsuarioService } from './perfil-usuario.service';
import { decodeJWT } from '../utils/decodeJWT';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private endpoint: string;
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private perfilService: PerfilUsuarioService,
    private userService: UserService
  ) {
    this.endpoint = enviroment.endpoint;
    this.apiUrl = 'order';
  }
  
  async createOrder() {
    // console.log(this.perfilCompanyService.getCompany());
    const payer = await decodeJWT(localStorage.getItem('token')).UserInfo;
    console.log(payer);
    
    this.perfilService.getClient(payer.email).subscribe((a)=>{
      console.log(a);
      
    })
    
    // return this.http.post(`${this.endpoint}${this.apiUrl}/create`, payload);
  }



}
