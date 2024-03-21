import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Company } from 'src/app/interfaces/company';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { CompanyService } from 'src/app/services/company.service';
import { ProductService } from 'src/app/services/product.service';

type UserType = Company & User;
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  selectedCategory: string = '';
  filteredCompanies: any[] = [{
    "document": "1007385654",
    "firstName": "jose leonardo",
    "lastName": "alvarez hoyos",
    "nameEmprendimiento": "Postres don leo",
    "email": "josel.alvarezh@uqvirtual.edu.co",
    "address": "calle 14b nu 3-20 e",
    "phoneNumber": "",
    "description": "Los mejores postres de armenia",
    "img": null,
    "password": "1234",
    "confirmPassword": "1234"
}];
  listCompanies: Company[] = [];
  leo = "josel.alvarezh@uqvirtual.edu.co";
  emprendedor = "emprendedor@gmail.com"
  constructor(
    private _companyService: CompanyService,
    private _productService: ProductService
  ) { }

  ngOnInit() {
    // this.getCompanies();
  }

  getCompanies() {
    this._companyService.getCompanies().subscribe((data: any) => {
      console.log(data.companies);
      
      this.listCompanies = data.companies;
      this.filteredCompanies = [...this.listCompanies]; // Inicializar los productos filtrados con todos los productos
    });
  }

  async cargarCategorias(company: any) {
    this._productService.getProductsByCompanyId(company.document).subscribe(products => {
      const myProducts: Product[] = products.data;
      const res = [... new Set(myProducts.map((p) => {
        return p.category;
      }))]
      console.log(res);
    })

  }

  filtrarPorCategoria(): void {
    if (this.selectedCategory.trim() !== '') {
      this.filteredCompanies = this.listCompanies.filter(company =>
        this.cargarCategorias(company)
      );
    } else {
      this.filteredCompanies = [...this.listCompanies]; // Restaurar la lista completa de productos si no se ha seleccionado ninguna categoría
    }
  }
}