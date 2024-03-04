import { Component,OnInit } from '@angular/core';
import { PerfilCompanyService } from '../../services/perfil-company.service'
import { Company } from '../../interfaces/company'
import {Product} from '../../interfaces/product'
import { Route } from '@angular/router';
import {ProductService} from '../../services/product.service'
@Component({
  selector: 'app-perfil-company',
  templateUrl: './perfil-company.component.html',
  styleUrls: ['./perfil-company.component.css']
})
export class PerfilCompanyComponent implements OnInit{
  

  company: Company[] = []
  product:Product[]=[]

  constructor(private perfilCompanyServices: PerfilCompanyService, private productservice:ProductService) {

  }
  

  getCompanys () {
    this.perfilCompanyServices.getCompany().subscribe((data: any) => {
      this.company = data.companies[0];
      console.log(this.company)
      
    })

  }
  getProducts(){
    this.productservice.getProducts().subscribe((data:any)=>{
      this.product=data.data[0];
            console.log(this.product)

    })
  }
  ngOnInit(): void {
    this.getCompanys();
    this.getProducts();
  }

  

}
