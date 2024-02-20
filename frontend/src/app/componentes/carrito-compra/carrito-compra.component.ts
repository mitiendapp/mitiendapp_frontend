import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css']
})
export class CarritoCompraComponent implements OnInit {
  products:any=[];
  title = 'sweetAlert'

  myCart$ = this._cartService.myCart$;

  viewCart: boolean = false;
  constructor(
    private _cartService: CartService
  ){

  }

  updateUnits(operation: string, id: number) {

    const product = this._cartService.findProductById(id)
    if (product) {
      if (operation === 'minus' && product.stock > 0) {
        product.stock = product.stock - 1;
      }
      if (operation === 'add') {
        product.stock = product.stock + 1;

      }
      if (product.stock === 0) {
        this.deleteProduct(id)
      }
    }

  }

  
  totalProduct(price: number, units: number) {
    return price * units
  }
  deleteProduct(id: number) {
    this._cartService.deleteProduct(id);

  }

  totalCart() {
    const result = this._cartService.totalCart();
    return result;
  }

  showModal(){
    Swal.fire({
      title: 'Compra exitosa',
      icon:'success',
      text:'Pues ver tu factura en tu correo',
      timer: 3000
  });
  }

ngOnInit(): void {
    this.getProducts();
}

  getProducts() {
    this._cartService.getProducts().subscribe((data: any) => {
      this.products = data.data;
      console.log(data.data);
      
    })
  }
}
