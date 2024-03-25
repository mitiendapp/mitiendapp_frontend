import { Component, OnInit } from '@angular/core';
import { PerfilCompanyService } from '../../services/perfil-company.service'
import { Company } from '../../interfaces/company'
import { Product } from '../../interfaces/product'
import { ProductService } from '../../services/product.service'
import { ActivatedRoute, Router } from '@angular/router';
import { decodeJWT } from 'src/app/utils/decodeJWT';
import {FiltroProductosService } from '../../services/FiltroProductos.service'
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';

// import { EditarCompanyComponent } from '../editar-company/editar-company.component';


@Component({
  selector: 'app-perfil-company',
  templateUrl: './perfil-company.component.html',
  styleUrls: ['./perfil-company.component.css']
})
export class PerfilCompanyComponent implements OnInit{
  
  user:any;
  form: FormGroup;
  showTable: boolean = false;
  mostrarBotonesInternos: boolean = true;
  company: Company[] = []
  product:Product[]=[]
  listProducts: Product[] = [];
  filteredProducts: Product[] = [];
  token:string;
  userInfo:any;
  tokenEmail:any;
  tokenId:any;
  imageFile: any;
  imagePreview: any;
  isValidImage: boolean = true;
  public  previsualizacion :string;

  constructor(
  private formBuilder: FormBuilder,
  private toastr: ToastrService,
  public _cartService: CartService,
  private router: Router, 
  private perfilCompanyServices: PerfilCompanyService, 
  private _filtroProductosService: FiltroProductosService,
  private routeActivate: ActivatedRoute, 
  private _productService: ProductService,
  private _messageService: MessageService,
  private _userService: UserService
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

  async getUser(email:any){
    await this._userService.find(email).subscribe((data:any)=>{
      this.user = data.user;
    })
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
      this.getUser(email);

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


onFileSelected(event: any) {
  this.imageFile = event.target.files[0];
  if (this.imageFile.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.readAsDataURL(this.imageFile);
    this.isValidImage = true;
  } else {
    this.isValidImage = false;
  }
  //  console.log()

  if (this.imageFile) {
    this.onUpdatedPortada();
  }
}

onUpdatedPortada(){

  // const imageFile = this.form.get('image').value;

  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    this.imageFile = fileInput.files[0];
  }
     console.log(this.imageFile)
  // 
  const formData = new FormData();
  this.userInfo = decodeJWT(localStorage.getItem('token'));
  this.tokenEmail = this.userInfo.UserInfo.email;
  formData.append('img', this.imageFile);

  this.perfilCompanyServices.postCompanyPortada(this.tokenEmail,formData).subscribe({
    next: (v) => {
      this.toastr.success('Portada cargada exitosamente');
    },
    error: (e: HttpErrorResponse) => {
      if (e) {
        this._messageService.msgError(e);
      } else {
        console.error('Error desconocido al intertar cargar la imagen',e);
      }
    },
    complete: () => {
      window.location.reload();
    }
  });

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
addToCart(product: Product) {
  
  try {
    this._cartService.addProduct(this._cartService.productToProductDTO(product));
    this._messageService.msgSuccess({message: "El producto fue agregado al carrito correctamente"});
  } catch (error) {
    this._messageService.msgError({message: "El producto ya se encuentra en el carrito"});
  }
}
removeCart(product: Product) {
  this._cartService.deleteProduct(this._cartService.productToProductDTO(product));
  this._messageService.msgSuccess({message: "El producto fue eliminado al carrito correctamente"})
}
mostrarDetalle(id: number) {
  this.router.navigate(['/detalle', id]);
}

}