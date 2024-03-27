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
  private apiUrl2:string;
  private actualizarCompany:string
  

  constructor(private http:HttpClient) {

    this.endpoint=enviroment.endpoint
    this.apiUrl= 'company';
    this.apiUrl2= 'companies';
    this.actualizarCompany= 'update';


  }
  getCompany(email:string):Observable<Company[]>{
    return this.http.get<Company[]>(`${this.endpoint}${this.apiUrl}/${email}`);

  }

  getCompanies():Observable<any>{
    return this.http.get<any>(`${this.endpoint}${this.apiUrl2}`);

  }


  postCompanyEditar(email: string, company: Company): Observable<Company[]> {
    const url = `${this.endpoint}${this.apiUrl}/update/${email}`;
    return this.http.post<Company[]>(url, company);
  }


  postCompanyPortada(email: string, companyPortada: FormData): Observable<any> {
    const url = `${this.endpoint}${this.apiUrl}/updateImage/${email}`;
    return this.http.post<any>(url, companyPortada);
  }
  
  // postCompanyEditar(email: string, company: Company): Observable<Company[]> {
  //   const url = `${this.endpoint}${this.apiUrl}/${this.actualizarCompany}/${email}`;
  //   return this.http.post<Company[]>(url, company);
  // }



}