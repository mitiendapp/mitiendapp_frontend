import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './services/socket.service';
import { ChatService } from './services/chat.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { decodeJWT } from './utils/decodeJWT';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{
  public user = new BehaviorSubject<any>(null);
  constructor(
    public http: HttpClient,
    public userService:UserService,
    // private _socketService: ChatService
  ){   
    if(localStorage.getItem('token')){
      this.userService.isLoggingIn.next(true);
    }else{
      this.userService.isLoggingIn.next(false);
    }
  }
  title = 'loginRegistroProyecto';
  login = false;

  async ngOnInit(){
    const UserInfo  = decodeJWT(localStorage.getItem('token'));
    if(UserInfo){
      this.userService.user.next(await firstValueFrom( this.userService.find(UserInfo.UserInfo.email)))
    }
  }

}

