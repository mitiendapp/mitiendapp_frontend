import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './services/socket.service';
import { ChatService } from './services/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{
  constructor(
    public http: HttpClient,
    public userService:UserService,
    private _socketService: ChatService
  ){   
    if(localStorage.getItem('token')){
      this.userService.isLoggingIn.next(true);
    }else{
      this.userService.isLoggingIn.next(false);
    }
  }
  title = 'loginRegistroProyecto';
  login = false;

  ngOnInit(): void {
      this._socketService.sendMessage("mensaje")
      this._socketService.loadMessages(this._socketService.roomId);
      this._socketService.getMessage().subscribe((data: any) => {
        if (this._socketService.roomId) {
          setTimeout(() => {
            console.log();
            
          }, 4);
        }
      });
  }

}

