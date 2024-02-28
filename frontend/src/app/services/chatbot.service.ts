import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private endpoint = enviroment.chat_endpoint;

  constructor(
    private http:HttpClient
  ) { }
  

  chat(userInput:any):Observable<any>{
    const payload = {"userInput":userInput}
    return this.http.post('http://localhost:3000/api/chat/', payload);
  }
}
