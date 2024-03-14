import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { decodeJWT } from 'src/app/utils/decodeJWT';
import { PerfilCompanyService } from '../../services/perfil-company.service'
import { Company } from '../../interfaces/company'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor( private formBuilder: FormBuilder, private router :Router, private routeActivate: ActivatedRoute,private perfilCompanyServices: PerfilCompanyService){}
  
  ngOnInit(): void {
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
    const { document, firstName, lastName, nameEmprendimiento, address, phoneNumber, description, email, password, confirmPassword } = this.form.value;
  }

  // devolverPerfil() {
  //   this.router.navigate(['/editarCompany']);
  // }

  isdevolverPerfil() {
    // return this.router.url.includes('perfilCompany/');
    
    this.userInfo = decodeJWT(localStorage.getItem('token'));
    // console.log(this.userInfo.UserInfo.email,' este es');
    this.tokenEmail = this.userInfo.UserInfo.email
    console.log(this.tokenEmail, 'este es el token cuando se preciona el perfil' )
   
    this.router.navigate(['perfilCompany',this.tokenEmail]);
  }



}