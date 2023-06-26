import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoged:boolean=true;
constructor(
  private router:Router
){

}

ngOnInit(): void {
  console.log("si");
  
}

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
