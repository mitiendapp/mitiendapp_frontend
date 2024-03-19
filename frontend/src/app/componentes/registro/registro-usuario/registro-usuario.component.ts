import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toast, ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { User } from 'src/app/interfaces/user';
import { HeaderService } from 'src/app/services/header.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  form: FormGroup;
  title = 'envioCorreo';
  loading = new BehaviorSubject<boolean>(false);


  constructor(
    private httpclien:HttpClient,
    private formBuilder: FormBuilder,
    private headerService: HeaderService,
    private toastr: ToastrService,
    private _userService:UserService,
    private _messageService:MessageService,
    private spinner : NgxSpinnerService,
    private router: Router 
  ){
     
  }
enviocorreo(){
  let params ={
    email:this.form.value.email,
  }
  this.httpclien.post('https://pruebabackend1.onrender.com/api/envio',params).subscribe(resp=>{ 
  })
}

  openSpinner(){
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },3000)
  }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        document: ['', Validators.required],
        email: ['', Validators.email],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      })
  
  }

  onRegister() {
    this.loading.next(true);
    const { firstName, document, email, password, confirmPassword } = this.form.value;
    if (!this.form.valid) {
      this.toastr.error("Todos los campos son obligatorios", "Error");
      this.loading.next(false);
      return;
    }
    if (password != confirmPassword) {
      this.toastr.error("las contraseñas no coinciden", "Error");
      this.loading.next(false);
      return;
    }
    const user: Client = {
      email: email,
      document: document,
      firstName:firstName,
      lastName: null, 
      address: null,
      password: password,
    }
    console.log(user);
    
    // this.loading = true;p
    this._userService.signInClient(user).subscribe({
      next: (v) => {
        this.toastr.success("El usuario fue registrado con exito", "Registro exitoso");
        // const main = document.getElementById('main');
        // main.classList.remove("right-panel-active");
        this.router.navigate(['login']);
      },
      error: (e: HttpErrorResponse) => {
        this._messageService.msgError(e);
      },
      complete() {
          this.loading.next(false);
      },
    })
  }
  isLoading(){
    return this.loading.asObservable();
  }
}