import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint: string;
  private apiUrl:string;


  constructor(private http: HttpClient) {
    this.endpoint = enviroment.endpoint; 
    this.apiUrl = 'user';
  }

  signIn(user:User):Observable<any>{
    return this.http.post(`${this.endpoint}${this.apiUrl}/register`, user)
  }
  logIn(user:User):Observable<String>{
    return this.http.post<string>(`${this.endpoint}${this.apiUrl}/login`, user)
  }
}
