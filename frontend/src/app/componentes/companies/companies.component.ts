import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Company } from 'src/app/interfaces/company';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { CompanyService } from 'src/app/services/company.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

type UserType = Company & User;
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  selectedCategory: string = '';
  filteredCompanies: any[] = [];
  listCompanies: Company[] = [];
  leo = "josel.alvarezh@uqvirtual.edu.co";
  emprendedor = "emprendedor@gmail.com"
  constructor(
    private _companyService: CompanyService,
    private _productService: ProductService,
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this._companyService.getCompanyUsers().subscribe((data: any) => { 
      this.listCompanies = data.companies;
      this.filteredCompanies = [...this.listCompanies];
    })
  }

  async cargarCategorias(company: any) {
    this._productService.getProductsByCompanyId(company.document).subscribe(products => {
      const myProducts: Product[] = products.data;
      const res = [... new Set(myProducts.map((p) => {
        return p.category;
      }))]
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

  onClickCompany(email: any) {
    this.router.navigate(['/company', email]);
  }

}
