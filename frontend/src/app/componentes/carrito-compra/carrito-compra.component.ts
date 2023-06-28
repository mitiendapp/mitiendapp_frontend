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
  constructor(
    private _cartService: CartService
  ){

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
