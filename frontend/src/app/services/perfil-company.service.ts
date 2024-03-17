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
  private actualizarCompany:string
  

  constructor(private http:HttpClient) {

    this.endpoint=enviroment.endpoint
    this.apiUrl= 'company';
    this.actualizarCompany= 'update';


  }
  getCompany(email:string):Observable<Company[]>{
    return this.http.get<Company[]>(`${this.endpoint}${this.apiUrl}/${email}`);

  }

  postCompanyEditar(email: string, company: Company): Observable<Company[]> {
    const url = `${this.endpoint}${this.apiUrl}/update/${email}`;
    return this.http.post<Company[]>(url, company);
  }
  
  // postCompanyEditar(email: string, company: Company): Observable<Company[]> {
  //   const url = `${this.endpoint}${this.apiUrl}/${this.actualizarCompany}/${email}`;
  //   return this.http.post<Company[]>(url, company);
  // }



}