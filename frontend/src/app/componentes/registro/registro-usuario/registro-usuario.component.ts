import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toast, ToastrService } from 'ngx-toastr';
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

  constructor(
    private httpclien:HttpClient,
    private formBuilder: FormBuilder,
    private headerService: HeaderService,
    private toastr: ToastrService,
    private _userService:UserService,
    private _messageService:MessageService,
    private spinner : NgxSpinnerService
  ){
     
  }
enviocorreo(){
  let params ={
    email:this.form.value.email,
  }
  console.log(params);
  
  this.httpclien.post('https://pruebabackend1.onrender.com/api/envio',params).subscribe(resp=>{
    console.log(resp);
    
  })

}

  openSpinner(){
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },3000)
  }

  ngOnInit(): void {
<<<<<<< HEAD
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      })
  
=======
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })

>>>>>>> 193824c5eb96131bf1ca8fcee11bb0af60d2e6d9
  }

  onRegister() {
    const { firstName, email, password, confirmPassword } = this.form.value;
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
      firstName:firstName,
    }
    console.log(user);

    // this.loading = true;p
    this._userService.signIn(user).subscribe({
      next: (v) => {
        // this.loading = false;
        this.toastr.success("El usuario fue registrado con exito", "Registro exitoso");
        const main = document.getElementById('main');
        main.classList.remove("right-panel-active");
      },
      error: (e: HttpErrorResponse) => {
        this._messageService.msgError(e);
        // this.loading = false;
      }
    })
  }
}