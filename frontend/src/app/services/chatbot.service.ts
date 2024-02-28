import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  constructor(
    private http:HttpClient
  ) { }
  

  chat(userInput:any):Observable<any>{
    const payload = {"userInput":userInput}
    return this.http.post('https://mitiendapp-chat-1.onrender.com/api/chat', payload);
  }
}
