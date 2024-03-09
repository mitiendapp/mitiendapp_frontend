import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from 'express';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private endpoint: string;
  private apiUrl: string;
  
  constructor(
    public router: Router,
    private http: HttpClient) { 
      this.endpoint = enviroment.endpoint;
      this.apiUrl = 'client/create';}

  signIn(client: any): Observable<any> {
    return this.http.post(`${this.endpoint}${this.apiUrl}`, client);
  }
}
