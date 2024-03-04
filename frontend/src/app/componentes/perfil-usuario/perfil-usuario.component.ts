
import { Component,OnInit } from '@angular/core';
import { PerfilCompanyService } from '../../services/perfil-company.service'
import { Company } from '../../interfaces/company'
import {Product} from '../../interfaces/product'
import { Route } from '@angular/router';
import {ProductService} from '../../services/product.service'
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  product:Product[]=[]
  constructor(private perfilCompanyServices: PerfilCompanyService, private productservice:ProductService) {
     
  }

  getProducts(){
    this.productservice.getProducts().subscribe((data:any)=>{
      this.product=data.data[0];
            console.log(this.product)

    })
  }


  ngOnInit(): void {
   
  }
}
