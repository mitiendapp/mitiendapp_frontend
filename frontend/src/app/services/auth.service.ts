import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataDecoded } from 'src/app/interfaces/data-decoded';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 


  private isLoggin = new BehaviorSubject<boolean>(false);

  private company = new BehaviorSubject<boolean>(false);
  private client = new BehaviorSubject<boolean>(false);
  private admin = new BehaviorSubject<boolean>(false);

  private data: DataDecoded  ;
  private helper = new JwtHelperService();

  constructor(private router: Router) {
    this.checkAuth();
  }

  perfilclient(){
    this.client.next(true);
    // this.mainActive.next(false)
  }
  public getToken() {
    return localStorage.getItem('token')
  }

  public isExpiredToken() {
    return this.helper.isTokenExpired(this.getToken());
  }

  private loginRole() {
    if (this.data.roles === 'Company') {
      this.company.next(true);
    } else if (this.data.roles === 'client') {
      this.client.next(true);
    } else if (this.data.roles === 'admin') {
      this.admin.next(true);
    }
  }

  private logoutRole() {
    if (this.data.roles === 'Company') {
      this.company.next(false);
    } else if (this.data.roles === 'client') {
      this.client.next(false);
    } else if (this.data.roles === 'admin') {
      this.admin.next(false);
    }
  }

  public getId() {
    return this.data.id;
  }

  public getRole() {
    return this.data.roles;
  }

  private checkAuth() {
    const token = this.getToken();
    if (token) {
      this.getData(token);
      this.isLoggin.next(true);
      this.loginRole();
      return;
    }
    this.isLoggin.next(false);
  }

  private getData(token: string) {
    // const decodedPayload = JSON.parse(atob(token.split('.')[1]));
   
    let decodedToken = this.helper.decodeToken(token);
   decodedToken = decodedToken.UserInfo
    let caracteres = decodedToken.roles;
    let texto = "";
    for (let i = 0; i < caracteres.length; i++) {
      // Si el caracter es una letra, agrégalo a la cadena 'texto'
      if (caracteres[i].match(/[a-zA-Z]/)) {
          texto += caracteres[i];
      }
    this.data = {
        
        id:decodedToken.id,
        email:decodedToken.email,
        roles:texto,
        firstName:decodedToken.firstName
    
    }}
    return this.data;
  }

  public login(token: string) {
    localStorage.setItem('token', token);
    this.getData(token);
    this.isLoggin.next(true);
    this.loginRole();
    console.log(token)
  }
  registerUser(){
    this.client.next(true);

  }
  public isLoggedIn() {
    return this.isLoggin.asObservable();
  }

  public isCompany() {
    return this.company.asObservable();
  }

  public isClient() {
    return this.client.asObservable();
  }

  public isAdmin() {
    return this.admin.asObservable();
  }

  public logout() {
    localStorage.removeItem('token');
    this.isLoggin.next(false);
    this.logoutRole();
    this.router.navigate(['login']);
  }
  public getUserFirstName() {
  // Suponiendo que 'data' contiene la información del usuario
  return this.data.firstName
  }


}
