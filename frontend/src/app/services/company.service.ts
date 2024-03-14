// business.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company';
import { enviroment } from '../enviroments/enviroment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private endpoint: string;
  private apiUrl: string;
  

  constructor(
    public router: Router,
    private http: HttpClient) { 
      this.endpoint = enviroment.endpoint;
      this.apiUrl = 'company';}

  signIn(company: Company): Observable<any> {
    return this.http.post(`${this.endpoint}${this.apiUrl}/create`, company);
  }

  find(email: any):Observable<any>{
    return this.http.get(`${this.endpoint}${this.apiUrl}/${email}`)
  }

}

