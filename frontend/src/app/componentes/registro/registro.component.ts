import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  negocioRegister = new BehaviorSubject<Boolean>(false);
  userRegister = new BehaviorSubject<Boolean>(true);
  mainActive = new BehaviorSubject<Boolean>(false);

  constructor(
    private headerService:HeaderService
  ){

  }

  ngOnInit(): void {
    this.mainActive.next(true);
    this.userRegister.next(false);
  }

  registerUser(){
    this.userRegister.next(true);
    this.mainActive.next(false)
  }
  registerNegocio(){
    this.negocioRegister.next(true)
    this.mainActive.next(false);
  }

  isMainActive(){
    return this.mainActive.asObservable();
  }
  
  isUserRegister(){
    return this.userRegister.asObservable();
  }
  
  isNegocioRegister(){
    return this.negocioRegister.asObservable();
  }
}
