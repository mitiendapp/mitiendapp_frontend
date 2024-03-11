import { Component, OnInit } from '@angular/core';
import { PerfilCompanyService } from '../../services/perfil-company.service'
import { Company } from '../../interfaces/company'
import { Product } from '../../interfaces/product'
import { ProductService } from '../../services/product.service'
import { ActivatedRoute, Router } from '@angular/router';
import { decodeJWT } from 'src/app/utils/decodeJWT';
import { EditarCompanyComponent } from '../editar-company/editar-company.component';
import { FiltroProductosService } from 'src/app/services/FiltroProductos.service';


@Component({
  selector: 'app-perfil-company',
  templateUrl: './perfil-company.component.html',
  styleUrls: ['./perfil-company.component.css']
})
export class PerfilCompanyComponent implements OnInit{
  
  // idCompany: string = '';
  tokenEmail:any;
  company: Company[] = []
  product:Product[]=[]
  listProducts: Product[] = [];
  filteredProducts: Product[] = [];
  token:string;
  userInfo:any;

  constructor(private perfilCompanyServices: PerfilCompanyService, 
    private productservice:ProductService,
    private routeActivate: ActivatedRoute, 
    private router :Router,
    private _productService: ProductService,
    private _filtroProductosService: FiltroProductosService,) {
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

  interfaceEditarCompany() {

    this.userInfo = decodeJWT(localStorage.getItem('token'));
    // console.log(this.userInfo.UserInfo.email,' este es');
    this.tokenEmail = this.userInfo.UserInfo.id
    console.log(this.tokenEmail, 'este es el token cuando se preciona el perfil' )
   
    this.router.navigate(['editarCompany',this.tokenEmail]);

  }

  interfaceAgregarProducto(){
    this.router.navigate(['/crearproducto'])
  }



  // getProducts() {
  //   this._productService.getProducts().subscribe((data: any) => {
  //     this.listProducts = data.data;
  //     this.filteredProducts = [...this.listProducts]; // Inicializar los productos filtrados con todos los productos
  //   });
  // }
  filtrarProductos(terminoBusqueda: string): void {
    if (terminoBusqueda.trim() !== '') {
      this.filteredProducts = this.listProducts.filter(producto =>
        producto.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.listProducts]; // Restaurar la lista completa de productos si el filtro está vacío
    }
  }
  ngOnInit(): void {
    // this.idCompany = this.routeActivate.snapshot.params["email"];
    // this.getCompanys(this.idCompany);
    // this.userInfo = decodeJWT(localStorage.getItem('token'));
    // console.log(this.userInfo.UserInfo.email,' este es');
    // this.getProducts();
    // this.routeActivate.params.subscribe(params => {
    //   const email = params['email'];
   
    let email = this.routeActivate.snapshot.params['companyId'];
    
    console.log(email, 'aqui estoy capturando el params osea el correo')
      this.getCompanyEmail(email);
      this.getProductsIdCompany(email);
  }
  deleteProduc(id:number){
    console.log('si');
    this._productService.deleteProdcuts(id).subscribe((data)=>{
      
    })
    console.log(id)
  }
  

//   getProductsIdCompany(companyId:any){
//     this._productService.getCompanybyProductsId(companyId).subscribe((data:any)=>{
//       this.listProducts = data.data;
//      console.log(data)
//     })
 
//  }
  // getCompanyEmail(email:Company){
  //   this.perfilCompanyServices.getCompany(this.email).subscribe((data:any)=>{
  //     this.company=data.data;
  //     console.log(data);
  //   })
  // }
//  emails: string[] = ['josel.alvarezh@uqvirtual.edu.co'];
//  companies: any[] = [];

getCompanyEmail(email: number) {
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

getProductsIdCompany(companyId:any){
  this._productService.getCompanybyProductsId(companyId).subscribe((data:any)=>{
    const dataProducts=data.data
    if (Array.isArray(dataProducts)) {
      this.listProducts = dataProducts; // Si es un arreglo, asignar directamente
      console.log(this.listProducts, 'adentro')
    } else {
      this.listProducts = [dataProducts]; // Si es un objeto, envolverlo en un arreglo
      console.log(this.listProducts, 'dentro else')
    }
    console.log(this.listProducts, 'afuera')
  })

}




// decodeJWT(token:string) {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));
//   return JSON.parse(jsonPayload);
// }

}