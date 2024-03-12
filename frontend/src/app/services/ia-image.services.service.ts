import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IaImage } from '../interfaces/iaImage';

@Injectable({
  providedIn: 'root'
})
export class IaImageServicesService {
  private url_image_ia:string;
  private complemento: string;


  constructor(private http:HttpClient) { 
    this.url_image_ia= enviroment.url_image_ia;
    this.complemento = 'process-image';
  }

  postIaImage(image: any): Observable<any> { // Cambiamos el tipo de parámetro a any
    return this.http.post<any>(`${this.url_image_ia}${this.complemento}`,image); // Enviamos el objeto completo al backend
  }

}
