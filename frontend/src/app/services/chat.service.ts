import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chats: { user: string, message: string }[] = []; // sould be Chat type
  storage: any[] = []; // temporary before use mongo
  roomId!: string; // temp holder
  messages: any[] = [];

  public socket: Socket;
  private url = 'http://localhost:4000'; // your server local path


  constructor() {
    this.socket = io(this.url, { transports: ['websocket', 'polling', 'flashsocket'] });  
  }


  joinRoom(data: any): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: any): void {
    this.socket.emit('message', data);
  }
  loadMessages(data:any){
    this.socket.emit('get all messages', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      this.socket.on('all messages', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  getStorage() { // needs to change after mongo implementation
    const storage: string = localStorage.getItem('chats')!;
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data: any) {
    localStorage.setItem('chats', JSON.stringify(data));
  }
}