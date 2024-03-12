import { Component,OnInit } from '@angular/core';
import { PerfilCompanyService } from '../../services/perfil-company.service'
import { Company } from '../../interfaces/company'
import {Product} from '../../interfaces/product'
import { Route } from '@angular/router';
import {ProductService} from '../../services/product.service'
import { ActivatedRoute, Router } from '@angular/router';
import { decodeJWT } from 'src/app/utils/decodeJWT';
@Component({
  selector: 'app-perfil-company',
  templateUrl: './perfil-company.component.html',
  styleUrls: ['./perfil-company.component.css']
})
export class PerfilCompanyComponent implements OnInit{
  
  // idCompany: string = '';
  company: Company[] = []
  product:Product[]=[]
  token:string;
  userInfo:any;
  constructor(private perfilCompanyServices: PerfilCompanyService, private productservice:ProductService,private routeActivate: ActivatedRoute) {
  }
  

  // getCompanys(email:string) {
  //   this.token = localStorage.getItem('token')
  //   const {UserInfo} = this.decodeJWT(this.token);
  //    this.email = UserInfo.email;
  //   console.log(this.email);
   

  //   this.perfilCompanyServices.getCompany(this.email).subscribe((data: any) => {
  //     this.company.push(data.company)
  //     console.log(this.company)
  //   })
 

  // }

  
  getProducts(){
    this.productservice.getProducts().subscribe((data:any)=>{
      this.product=data.data;

    })
  }
  ngOnInit(): void {
    // this.idCompany = this.routeActivate.snapshot.params["email"];
    // this.getCompanys(this.idCompany);
    this.userInfo = decodeJWT(localStorage.getItem('token'));
    console.log(this.userInfo);
    
  }

  // getCompanyEmail(email:Company){
  //   this.perfilCompanyServices.getCompany(this.email).subscribe((data:any)=>{
  //     this.company=data.data;
  //     console.log(data);
  //   })
  // }
 emails: string[] = ['josel.alvarezh@uqvirtual.edu.co'];
 companies: any[] = [];
  getCompanyEmail() {
    this.perfilCompanyServices.getCompany(this.userInfo.email).subscribe((data: any) => {
      this.company = data.data;
      console.log(data);
    });
  }

}