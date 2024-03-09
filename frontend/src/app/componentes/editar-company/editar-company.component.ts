import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { decodeJWT } from 'src/app/utils/decodeJWT';

@Component({
  selector: 'app-editar-company',
  templateUrl: './editar-company.component.html',
  styleUrls: ['./editar-company.component.css']
})
export class EditarCompanyComponent  implements OnInit{

  userInfo:any;
  tokenEmail:string='';

  constructor( private router :Router){}
  
  ngOnInit(): void {
    
  }
  
  interfaceEditarCompany() {
    this.router.navigate(['/editarCompany']);
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
