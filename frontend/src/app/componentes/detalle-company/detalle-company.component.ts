import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/interfaces/company';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { CompanyService } from 'src/app/services/company.service';
import { MessageService } from 'src/app/services/message.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detalle-company',
  templateUrl: './detalle-company.component.html',
  styleUrls: ['./detalle-company.component.css']
})
export class DetalleCompanyComponent {
  listProducts:any;
  user:any;
  company: Company;
  constructor(
    private routeActivate: ActivatedRoute,
    private _companyService: CompanyService,
    private _userService: UserService,
    private router:Router,
    private _cartService:CartService,
    private messageService:MessageService,
    private productService:ProductService
  ) { }

  async ngOnInit() {
    const email = this.routeActivate.snapshot.params["email"];
    this.getCompany(email);
    this.getUser(email);
  }
  async getCompany(email: any) {
    await this._companyService.find(email).subscribe((data: any) => {
      this.company = data.company;
    })
  }
  async getUser(email: any) {
    await this._userService.find(email).subscribe((data: any) => {
      this.user = data.user;
      this.getCompanyProducts(data.user.id);
    })
  }
  mostrarDetalle(id: number) {
    this.router.navigate(['/detalle', id]);
  }
  addToCart(product: Product) {
  
    try {
      this._cartService.addProduct(this._cartService.productToProductDTO(product));
      this.messageService.msgSuccess({message: "El producto fue agregado al carrito correctamente"});
    } catch (error) {
      this.messageService.msgError({message: "El producto ya se encuentra en el carrito"});
    }
  }

  async getCompanyProducts(id:any){
    await this.productService.getProductsByCompanyId(id).subscribe((data)=>{
      this.listProducts = data.data; 
    })
  }
}