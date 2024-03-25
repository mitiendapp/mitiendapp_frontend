import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/interfaces/company';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderService } from 'src/app/services/header.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-registro-negocio',
  templateUrl: './registro-negocio.component.html',
  styleUrls: ['./registro-negocio.component.css']
})
export class RegistroNegocioComponent implements OnInit {
  form: FormGroup;
  title = 'envioCorreo';
  loading = new BehaviorSubject<boolean>(false);

  constructor(
    private httpclien: HttpClient,
    private formBuilder: FormBuilder,
    private headerService: HeaderService,
    private toastr: ToastrService,
    private _companyService: CompanyService,
    private _messageService: MessageService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }
  enviocorreo() {
    let params = {
      email: this.form.value.email,
    }
    console.log(params);

    this.httpclien.post('https://pruebabackend1.onrender.com/api/envioCompany', params).subscribe(resp => {
      console.log(resp);

    })

  }

  openSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000)
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({

      document: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nameEmprendimiento: ['', Validators.required],
      email: ['', Validators.required,],
      address: ['', Validators.required],
      description: ['', Validators.required],
      password: ['', Validators.required,],
      confirmPassword: ['', Validators.required],
    })
  }
  onRegister() {
    this.loading.next(true);
    const { document, firstName, lastName, nameEmprendimiento, address, phoneNumber, description, email, password, confirmPassword } = this.form.value;
    if (!this.form.valid) {
      this.toastr.error("Todos los campos son obligatorios", "Error");
      this.loading.next(false);
      return;
    }
    if (password != confirmPassword) {
      this.toastr.error("Las contraseñas no coinciden", "Error");
      this.loading.next(false);
      return;
    }
    const company: Company = {
      document: document,
      email: email,
      firstName: firstName,
      lastName: lastName,
      nameEmprendimiento: nameEmprendimiento,
      address: address,
      phoneNumber: "",
      description: description,
      password: password,
      confirmPassword: confirmPassword

    }

    this._companyService.signIn(company).subscribe({
      next: (v) => {
        this.toastr.success("El emprendimiento fue registrado con éxito", "Registro exitoso");
        this.router.navigate(['login']);
      },
      error: (e: HttpErrorResponse) => {
        if (e) {
          this._messageService.msgError(e);
        } else {
          this._messageService.msgError("El correo o la contraseña son incorrectos");
        }
        this.loading.next(false);
      },
      complete() {
        this.loading.next(false);
      },
    });
  }
  isLoading(){
    return this.loading.asObservable();
  }
}
