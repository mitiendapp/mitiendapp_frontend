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
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { decodeJWT } from 'src/app/utils/decodeJWT';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  formAccount: FormGroup;
  formPassword: FormGroup;
  loading = new BehaviorSubject<Boolean>(false);
  account: any;
  userInfo: any;
  tokenEmail: any;
  validAccount = new BehaviorSubject<Boolean>(false);
  imageUrl = "../../../assets/img/3d-render-secure-login-password-illustration como objeto inteligente-1.png";

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public userService: UserService,
    private toastr: ToastrService,
    private _userService: UserService,
    private _messageService: MessageService,
    private headerService: HeaderService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private routeActivate: ActivatedRoute
  ) {
  }

  openSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000)
  }

  ngOnInit(): void {
    this.formAccount = this.formBuilder.group({
      email: ['', Validators.required]
    })
    this.formPassword = this.formBuilder.group({
      password: ['', Validators.required]
    })
  }

  // mostrarDetalle(email: string) {
  //   this.router.navigate(['/perfilCompany',email]);
  // }

  submitAccount() {
    const { email } = this.formAccount.value
    console.log(email);

    if (!this.formAccount.valid) {
      this.toastr.error("Debe ingresar su correo o telefono", "Error")
      return;
    }
    this.account = email;
    this.validAccount.next(true);
    return;
  }

  async submitPassword() {
    this.loading.next(true);
    setTimeout(() => {
      
    }, 500);
    const { password } = this.formPassword.value;
    if (!this.formPassword.valid) {
      this.toastr.error("Debe ingresar la contraseña", "Error");
      return;
    }

    const user: User = {
      email: this.account,
      password: password
    }

    this._userService.logIn(user).subscribe({
      next: (data: any) => {
        this.auth.login(data.token)
        console.log(data)
        console.log(this.auth.getRole() == "client");

        if (this.auth.getRole() == "client") {

          this.router.navigate(['']);
        } else {

          this.userInfo = decodeJWT(localStorage.getItem('token'));
          console.log(this.userInfo.UserInfo.email, ' este es');
          this.tokenEmail = this.userInfo.UserInfo.email
          console.log(this.tokenEmail, 'ste es cuando se carga el loguedo')



          this.router.navigate(['perfilCompany', this.tokenEmail]);
        }
        localStorage.setItem('token', data.token);
        this._messageService.msgSuccess(data);
        this._userService.isLoggedIn = true;
      },
      error: (e: any) => {
        this.loading.next(false);
        this._messageService.msgError(e);
      },complete() {
          console.log("complete");
          
          this.loading.next(false);
      },
    });
    this.userService.openSession(user);
  }

  isValidAccount(): Observable<Boolean> {
    return this.validAccount.asObservable();
  }

  decodeJWT(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  isLoading() {
    return this.loading.asObservable();
  }
}

