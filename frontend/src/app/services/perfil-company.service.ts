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
  
  private actualizarCompany1:string
  private endpoint:string;
  private apiUrl:string;
  private apiUrlAll:string;
  
 
  constructor(private http:HttpClient) {

    this.endpoint=enviroment.endpoint
    this.apiUrl= 'company';
    this.apiUrlAll= 'companies';
    this.actualizarCompany1 = 'update';




  }
  getCompany(email:number):Observable<Company[]>{
    return this.http.get<Company[]>(`${this.endpoint}${this.apiUrl}/${email}`);

  }

  postCompanyEditar(email: string, company: Company): Observable<Company[]> {
    const url = `${this.endpoint}${this.apiUrl}/${this.actualizarCompany1}?email=${email}`;
    return this.http.post<Company[]>(url, company);
  }
  

  // create(productData: FormData):Observable<any>{//crear productos
  //   return this.http.post<any>(`${this.endpoint}${this.apiUrl}${this.create1}`, productData)
  // }
  getCompanyAll():Observable<Company[]>{
    return this.http.get<Company[]>(`${this.endpoint}${this.apiUrlAll}`);

  }
}