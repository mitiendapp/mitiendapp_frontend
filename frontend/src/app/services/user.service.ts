import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint: string;
  private apiUrl: string;
  public isLoggedIn = false;
  public isLoggingIn = new BehaviorSubject<Boolean>(false);
  public user = new BehaviorSubject<User>(null);
  public currentUser?:User = null;

  constructor(
    public router: Router,
    private http: HttpClient 
    ) {
    this.endpoint = enviroment.endpoint;
    this.apiUrl = 'user';
  }

  openSession(user: any){
    this.user.next(user);
  }
  closeSession(){
    localStorage.removeItem('token');
    this.isLoggingIn.next(false);
    this.user.next(null);
    this.router.navigate([''])
  } 
  isUserActive(): Observable<Boolean>{
    return this.isLoggingIn.asObservable();
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.endpoint}${this.apiUrl}/create`, user)
  }
  logIn(user: User): Observable<String> {
    return this.http.post<string>(`${this.endpoint}${this.apiUrl}/login`, user)
  }

  signInClient(user: Client): Observable<any> {
      return this.http.post(`http://localhost:3000/api/client/create`, user);
    }
}
