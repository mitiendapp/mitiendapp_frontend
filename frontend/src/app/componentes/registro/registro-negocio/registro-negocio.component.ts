import {Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/interfaces/company';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderService } from 'src/app/services/header.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-negocio',
  templateUrl: './registro-negocio.component.html',
  styleUrls: ['./registro-negocio.component.css']
})
export class RegistroNegocioComponent implements OnInit {
  form: FormGroup;
  title = 'envioCorreo';
  

  constructor(
    private httpclien:HttpClient,
    private formBuilder: FormBuilder,
    private headerService:HeaderService,
    private toastr: ToastrService,
    private _companyService:CompanyService,
    private _messageService:MessageService,
    private spinner : NgxSpinnerService,
    private router: Router
    ) { }
    enviocorreo(){
      let params ={
        email:this.form.value.email,
      }
      console.log(params);
      
      this.httpclien.post('https://pruebabackend1.onrender.com/api/envioCompany',params).subscribe(resp=>{
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
    this.form = this.formBuilder.group({

      nameVenture: ['', Validators.required],
      description: ['', Validators.required],
      ventureAddress: ['', Validators.required],
      nameEntrepreneur: ['', Validators.required],
      docEntrepreneur: ['', Validators.required,],
      email: ['', Validators.required],
      password: ['', Validators.required,],
      confirmPassword: ['', Validators.required],
  })
}
onRegister() {
  const { nameVenture, description, ventureAddress, nameEntrepreneur, docEntrepreneur,email, password, confirmPassword } = this.form.value;
  if (!this.form.valid) {
    this.toastr.error("Todos los campos son obligatorios", "Error");
    return;
  }
  if (password != confirmPassword) {
    this.toastr.error("Las contraseñas no coinciden", "Error");
    return;
  }
  const company: Company = {
    nameVenture:nameVenture,
    description:description,
    ventureAddress:ventureAddress,
    nameEntrepreneur:nameEntrepreneur,
    docEntrepreneur:docEntrepreneur,
    email: email,
    password:password, 
    confirmPassword:confirmPassword
    
  }

  this._companyService.signIn(company).subscribe({
    next: (v) => {
      this.toastr.success("El emprendimiento fue registrado con éxito", "Registro exitoso");
      // const main = document.getElementById('main');
      // main.classList.remove("right-panel-active");
      this.router.navigate(['login']);
    },
    error: (e: HttpErrorResponse) => {
      if (e) {
        this._messageService.msgError(e);
      } else {
        console.error("Error desconocido al intentar registrar el emprendimiento");
      }
    }
  });
}

}
