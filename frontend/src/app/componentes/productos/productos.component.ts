import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';

// import { productosDisponibles } from 'src/app/models/productos';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listProducts: Product[] = []
  product:any;
  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private route: ActivatedRoute, private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe((data: any) => {
      this.listProducts = data.data;
    })
  }
  mostrarDetalle(id: number) {
    this.router.navigate(['/detalle', id]);
  }
  agregarAlCarrito(id:number){
    this.getProduct(id);
    setTimeout(()=>{
      // console.log(this.product);
      this.addProduct(this.product)
      // localStorage.setItem('producto', JSON.stringify(this.product))
    }, 1000)
    
    //this.router.navigate(['carritoCompra']);
  }
  getProduct(id:number) {

    this._productService.getProductById(id).subscribe((data: any) => {
      this.product = data.data;
    });
  }

  addToCart(product: Product) {
 console.log(product)
    this._cartService.addProduct(product)
  }


  addProduct(product:any){
    this._cartService.create(product).subscribe((data:any)=>{
      console.log(data);
      
    })
  }
}





