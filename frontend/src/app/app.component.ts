import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  constructor(
    public http: HttpClient,
    public userService:UserService
  ){   
    if(localStorage.getItem('token')){
      this.userService.isLoggingIn.next(true);
    }else{
      this.userService.isLoggingIn.next(false);
    }
  }
  title = 'loginRegistroProyecto';
  login = false;
}

