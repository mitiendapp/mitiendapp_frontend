import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/services/message.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css'],

})
export class LoginRegistroComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup
  products: any;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService, 
    private _messageService:MessageService  
  ) {
  }

  
 
 

  ngOnInit(): void {
    //localStorage.setItem("token", "ahsdgjfdagjsdfasgdjsadgsa");
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })

    this.form2 = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    console.log(this.form.value);
    console.log(this.form2.value);

    this.dom()
  }
  


  onSubmitR() {
    const { email, password, confirmPassword } = this.form.value;
    if (!this.form.valid) {
      this.toastr.error("Todos los campos son obligatorios", "Error");
      return;
    }
    if (password != confirmPassword) {
      this.toastr.error("las contraseñas no coinciden", "Error");
      return;
    }
    const user: User = {
      email: email,
      password: password,
    }
    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success("El usuario fue registrado con exito", "Registro exitoso");
        const main = document.getElementById('main');
        main.classList.remove("right-panel-active");
      },
      error: (e: HttpErrorResponse) => {
        this._messageService.msgError(e);
        this.loading = false;
      }
    })
  }


  dom() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const main = document.getElementById('main');

    signUpButton.addEventListener('click', () => {
      main.classList.add("right-panel-active");
    });
    signInButton.addEventListener('click', () => {
      main.classList.remove("right-panel-active");

    });
  }

  onSubmitL() {
    const { email, password } = this.form2.value;
    if (!this.form2.valid) {
      this.toastr.error("Correo y contraseña son requeridos", "Error")
      return;
    }

    const user: User = {
      email: email,
      password: password
    }
    this._userService.logIn(user).subscribe({
      next: (data: any) => {
        this.router.navigate(['products']);
        localStorage.setItem('token', data.token)
        localStorage.setItem('isLoged', "true");
        this._messageService.msgSuccess(data)
      },
      error: (e: HttpErrorResponse) => {
        this._messageService.msgError(e);
        this.loading = false;
      }
    })
  }

}
