import { Component,OnInit } from '@angular/core';
import { PerfilCompanyService } from '../../services/perfil-company.service'
import { Company } from '../../interfaces/company'
import { Route } from '@angular/router';
import {ProductService} from '../../services/product.service'
@Component({
  selector: 'app-perfil-company',
  templateUrl: './perfil-company.component.html',
  styleUrls: ['./perfil-company.component.css']
})
export class PerfilCompanyComponent implements OnInit{
  

  company: Company[] = []
  constructor(private perfilCompanyServices: PerfilCompanyService, private productservice:ProductService) {

  }
  

  getCompanys () {
    this.perfilCompanyServices.getCompany().subscribe((data: any) => {
      this.company = data.data;
      console.log(data)
      
    })

  }
  getProducts(){
    this.productservice.getProducts().subscribe((data:any)=>{
      this.getProducts=data.data;
    })
  }
  ngOnInit(): void {
    this.getCompanys();
  }

  

}
