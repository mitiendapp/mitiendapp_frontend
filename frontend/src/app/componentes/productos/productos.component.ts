import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { FiltroProductosService } from 'src/app/services/FiltroProductos.service';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  cartIcon:any = "../../../assets/icons/shopping-cart-add-svgrepo-com.svg";
  listProducts: Product[] = [];
  filteredProducts: Product[] = []; // Arreglo para almacenar los productos filtrados
  product: any;

  constructor(
    private _productService: ProductService,
    private _filtroProductosService: FiltroProductosService,
    public _cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    public auth:AuthService,
    private productService: ProductService,
   private companyService:CompanyService

  ) {}

  ngOnInit(): void {

    // this.companyService.find("a@a.com").subscribe({
    //   next(value) {
    //       console.log(value);
          
    //   },complete() {
    //       console.log("complete");
          
    //   },error(err) {
    //       console.log(err);
          
    //   },
    // })

    this.auth.isCompany().subscribe(value =>{

         console.log(value);
    } )
    this.getProducts();


    // Suscribirse al servicio de filtro de productos para reaccionar a los cambios en el filtro
    this._filtroProductosService.filtroProductos$.subscribe(filtro => {
      this.filtrarProductos(filtro);
    });
  }

  getProducts() {
    this._productService.getProducts().subscribe((data: any) => {
      this.listProducts = data.data;
      this.filteredProducts = [...this.listProducts]; // Inicializar los productos filtrados con todos los productos
    });
  }

  // Método para filtrar productos
  filtrarProductos(terminoBusqueda: string): void {
    if (terminoBusqueda.trim() !== '') {
      this.filteredProducts = this.listProducts.filter(producto =>
        producto.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.listProducts]; // Restaurar la lista completa de productos si el filtro está vacío
    }
  }

  selectedCategory: string = ''; // Propiedad para almacenar la categoría seleccionada

filtrarPorCategoria(): void {
    if (this.selectedCategory.trim() !== '') {
        this.filteredProducts = this.listProducts.filter(producto =>
            producto.category === this.selectedCategory
        );
    } else {
        this.filteredProducts = [...this.listProducts]; // Restaurar la lista completa de productos si no se ha seleccionado ninguna categoría
    }
}


  mostrarDetalle(id: number) {
    this.router.navigate(['/detalle', id]);
  }

  agregarAlCarrito(id: number) {
    this.getProduct(id);
    setTimeout(() => {
      this.addProduct(this.product);
    }, 1000);
  }

  getProduct(id: number) {
    this._productService.getProductById(id).subscribe((data: any) => {
      this.product = data.data;
    });
  }

  addToCart(product: Product) {
    try {
      this._cartService.addProduct(this._cartService.productToProductDTO(product));
      this.messageService.msgSuccess({message: "El producto fue agregado al carrito correctamente"});
    } catch (error) {
      this.messageService.msgError({message: "El producto ya se encuentra en el carrito"});
    }
  }
  removeCart(product: Product) {
    this._cartService.deleteProduct(this._cartService.productToProductDTO(product));
    this.messageService.msgSuccess({message: "El producto fue eliminado al carrito correctamente"})
  }

  addProduct(product: any) {
    this._cartService.create(product).subscribe((data: any) => {
      console.log(data);
    });
  }

  deleteProducto(product: any) {
    console.log(product);
    this._productService.deleteProdcuts(product).subscribe(data => {});
  }
}
