import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { decodeJWT } from 'src/app/utils/decodeJWT';
import { PerfilCompanyService } from '../../services/perfil-company.service'
import { Company } from '../../interfaces/company'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';
import { Toast, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editar-company',
  templateUrl: './editar-company.component.html',
  styleUrls: ['./editar-company.component.css']
})
export class EditarCompanyComponent  implements OnInit{
  form: FormGroup;
  company: Company[] = []
  userInfo:any;
  tokenEmail:any;
  tokenId:any;

  constructor( private toastr: ToastrService,  private _messageService:MessageService, private formBuilder: FormBuilder, private router :Router, private routeActivate: ActivatedRoute,private perfilCompanyServices: PerfilCompanyService){}
  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
     document: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nameEmprendimiento: ['', Validators.required],
      // email: ['', Validators.required,],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      description: ['', Validators.required],
    
  })


    let email = this.routeActivate.snapshot.params['email'];
    console.log(email, 'aqui estoy capturando el params osea el correo')
      this.getCompanyEmail(email);
    // });
  }
  
  interfaceEditarCompany() {
    this.router.navigate(['/editarCompany']);
  }

  getCompanyEmail(email: string) {
    this.perfilCompanyServices.getCompany(email).subscribe((data: any) => {
      const companyData = data.company; // Obtener los datos de la compañía
      if (Array.isArray(companyData)) {
        this.company = companyData; // Si es un arreglo, asignar directamente
      } else {
        this.company = [companyData]; // Si es un objeto, envolverlo en un arreglo
      }
      console.log(this.company);
    });
  }

  OnUpdatePerfil(){
    const { document, firstName, lastName, nameEmprendimiento, address, phoneNumber, description} = this.form.value;
    const company: Company = {
      document:document,
      firstName:firstName,
      lastName:lastName,
      nameEmprendimiento:nameEmprendimiento,
      address:address,
      phoneNumber:phoneNumber,
      description:description
       
    }

    this.userInfo = decodeJWT(localStorage.getItem('token'));
    // console.log(this.userInfo.UserInfo.email,' este es');
    this.tokenEmail = this.userInfo.UserInfo.email
 
    this.perfilCompanyServices.postCompanyEditar(this.tokenEmail,company).subscribe({
      next: (v) => {
        this.toastr.success( "Actualizado con exito");
        // const main = document.getElementById('main');
        // main.classList.remove("right-panel-active");
      },
      error: (e: HttpErrorResponse) => {
        if (e) {
          this._messageService.msgError(e);
        } else {
          console.error("Error desconocido al intentar actualizar datos del emprendedo");
        }
      }
    })
 
  }

  devolverPerfil() {
    this.router.navigate(['/editarCompany']);
  }

  // isdevolverPerfil() {
  //   // return this.router.url.includes('perfilCompany/');
    
  //   this.userInfo = decodeJWT(localStorage.getItem('token'));
  //   // console.log(this.userInfo.UserInfo.email,' este es');
  //   this.tokenEmail = this.userInfo.UserInfo.email
  //   console.log(this.tokenEmail, 'este es el token cuando se preciona el perfil' )
   
  //   this.router.navigate(['perfilCompany',this.tokenEmail]);
  // }



}