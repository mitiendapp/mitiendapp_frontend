import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { Company } from '../interfaces/company';
@Injectable({
  providedIn: 'root'

})
export class PerfilCompanyService {
  private endpoint:string;
  private apiUrl:string;
  private apiUrlAll:string;

  constructor(private http:HttpClient) {

    this.endpoint=enviroment.endpoint
    this.apiUrl= 'company';
    this.apiUrlAll= 'companies';



  }
  getCompany(email:string):Observable<Company[]>{
    return this.http.get<Company[]>(`${this.endpoint}${this.apiUrl}/${email}`);

  }

  getCompanyAll():Observable<Company[]>{
    return this.http.get<Company[]>(`${this.endpoint}${this.apiUrlAll}`);

  }
}