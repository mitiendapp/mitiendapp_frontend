import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoged:boolean=false;

constructor(
  private router:Router,
  private _userService:UserService
){

}

ngOnInit(): void {
  this.router.events.subscribe(event=>{
    if(event.constructor.name === "NavigationEnd"){
      this.isLoged = this._userService.isLoggedIn
    }
  })
}

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    this._userService.isLoggedIn=false;
  }

}
