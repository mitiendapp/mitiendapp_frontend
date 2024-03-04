import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  formAccount: FormGroup;
  formPassword: FormGroup;
  loading: boolean = false;
  account: any;
  validAccount= new BehaviorSubject<Boolean>(false);

constructor(
  private formBuilder: FormBuilder,
  public router: Router,
  public userService:UserService,
  private toastr: ToastrService,
  private _userService: UserService,
  private _messageService:MessageService,
  private headerService:HeaderService
){ 
}

ngOnInit(): void {
    this.formAccount = this.formBuilder.group({
      email: ['', Validators.required]
    })
    this.formPassword = this.formBuilder.group({
      password: ['', Validators.required]
    })
}

submitAccount(){
  const {email} = this.formAccount.value
  console.log(email);
  
  if (!this.formAccount.valid) {
    this.toastr.error("Debe ingresar su correo o telefono", "Error")
    return;
  }
  this.account = email;
  this.validAccount.next(true);
  return;
}

submitPassword(){
  const {password}  = this.formPassword.value;
  if (!this.formPassword.valid) {
    this.toastr.error("Debe ingresar la contraseña", "Error")
    return;
  }
  
  const user: User = {
    email: this.account,
    password: password
  }
  
  this._userService.logIn(user).subscribe({
    next: (data: any) => {
      console.log("llega");
      this.router.navigate(['']);
      localStorage.setItem('token', data.token);
      this._messageService.msgSuccess(data);
      this._userService.isLoggedIn = true;
    },
    error: (e: HttpErrorResponse) => {
      this._messageService.msgError(e);
      this.loading = false;
    }
  })
  this.userService.isLoggingIn.next(true);
  this.userService.openSession(user);
}

isValidAccount(): Observable<Boolean>{
  return this.validAccount.asObservable();  
}

}


