import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {
  private endpoint:string;
  private apiUrl:string;
  constructor(private http:HttpClient) {

    this.endpoint=enviroment.endpoint
    this.apiUrl= 'client';


  }
  getClient(email:string):Observable<Client>{

    return this.http.get<Client>(`${this.endpoint}${this.apiUrl}/${email}`);

  }
}
