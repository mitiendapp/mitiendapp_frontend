import { Component, OnInit } from '@angular/core';
import { PerfilCompanyService } from '../../services/perfil-company.service'
import { Company } from '../../interfaces/company'
import { Product } from '../../interfaces/product'
import { ProductService } from '../../services/product.service'
import { ActivatedRoute, Router } from '@angular/router';
import { decodeJWT } from 'src/app/utils/decodeJWT';
import {FiltroProductosService } from '../../services/FiltroProductos.service'
// import { EditarCompanyComponent } from '../editar-company/editar-company.component';


@Component({
  selector: 'app-perfil-company',
  templateUrl: './perfil-company.component.html',
  styleUrls: ['./perfil-company.component.css']
})
export class PerfilCompanyComponent implements OnInit{
  
  
  showTable: boolean = false;
  mostrarBotonesInternos: boolean = false;
  company: Company[] = []
  product:Product[]=[]
  listProducts: Product[] = [];
  filteredProducts: Product[] = [];
  token:string;
  userInfo:any;
  tokenEmail:any;
  tokenId:any;

  constructor(
  private router: Router, 
  private perfilCompanyServices: PerfilCompanyService, 
  private _filtroProductosService: FiltroProductosService,
  private routeActivate: ActivatedRoute, 
  private _productService: ProductService,
  ) {
  }

 
  toggleTable() {
    this.showTable = !this.showTable;
}

  interfaceEditarCompany() {

    this.userInfo = decodeJWT(localStorage.getItem('token'));
 
    this.tokenEmail = this.userInfo.UserInfo.email
    console.log(this.tokenEmail, 'este es el token cuando se preciona el perfil' )
   
    this.router.navigate(['editarCompany',this.tokenEmail]);

  }

  navigateCrearProducto(){
    this.router.navigate(['crearproducto']);
  }

  toggleBotonesInternos() {
    this.mostrarBotonesInternos = !this.mostrarBotonesInternos;
  }

  navigateEditarProducto(product:any){
    this._productService.currentProduct.next(product);
    this.router.navigate(['editarProduct/',product.id])
  }

  

 



  getProducts(){
    this._productService.getProducts().subscribe((data:any)=>{
      this.product=data.data;

    })
  }
  ngOnInit(): void {
   
   
    let email = this.routeActivate.snapshot.params['email'];
    
    console.log(email, 'aqui estoy capturando el params osea el correo')
      this.getCompanyEmail(email);
      //ID 

    
      this.userInfo = decodeJWT(localStorage.getItem('token'));
      this.tokenId = this.userInfo.UserInfo.id
      this.getProductsIdCompany(this.tokenId)


    // });
  }

  // getCompanyEmail(email:Company){
  //   this.perfilCompanyServices.getCompany(this.email).subscribe((data:any)=>{
  //     this.company=data.data;
  //     console.log(data);
  //   })
  // }
//  emails: string[] = ['josel.alvarezh@uqvirtual.edu.co'];
//  companies: any[] = [];

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

//arreglo de porductos leo 
filtrarProductos(terminoBusqueda: string): void {
  if (terminoBusqueda.trim() !== '') {
    this.filteredProducts = this.listProducts.filter(producto =>
      producto.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
  } else {
    this.filteredProducts = [...this.listProducts]; // Restaurar la lista completa de productos si el filtro está vacío
  }
}


getProductsIdCompany(companyId:string){
  console.log("hola....")
  this._productService.getProductsByCompanyId(companyId).subscribe((data:any)=>{
    const dataProducts=data.data
    if (Array.isArray(dataProducts)) {
      this.listProducts = dataProducts; // Si es un arreglo, asignar directamente
      
    } else {
      this.listProducts = [dataProducts]; // Si es un objeto, envolverlo en un arreglo
     
    }
    
  })

}


getProductsIdCompany2(id:any){
  
  this._productService.getProductId(id).subscribe((data:any)=>{
    const dataProducts=data.data
    if (Array.isArray(dataProducts)) {
      this.listProducts = dataProducts; // Si es un arreglo, asignar directamente
     
    } else {
      this.listProducts = [dataProducts]; // Si es un objeto, envolverlo en un arreglo
      
    }
    
  })

}
confirmDelete(id: any): void {
  if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.deleteProductsCompany(id);
  }
}

actualizarProduct(id: any){

}

deleteProductsCompany(id:any){

  this._productService.deleteProducts2(id).subscribe(
    
    response => {
      console.log('Product deleted successfully', response);
      this.router.navigate(['perfilCompany',this.tokenEmail]);

    },
    error => {
      console.error('Error deleting product', error);
  
    }
  )

}

}