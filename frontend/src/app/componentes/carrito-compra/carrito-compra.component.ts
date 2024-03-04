import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'src/app/services/message.service';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  // styleUrls: ['./carrito-compra.component.css']
})
export class CarritoCompraComponent implements OnInit {
  title = 'sweetAlert'

  myCart$ = this._cartService.myCart$;

  viewCart: boolean = false;
  constructor(
    private _cartService: CartService,
    private messageService: MessageService,
    private _paymentService: PaymentService
  ) {

  }
  createOrder() {
    this._paymentService.createOrder().subscribe((data: any) => {
      console.log(data);
      window.location.href = data.init_point
    })
  }


  totalCart() {
    const result = this._cartService.totalCart();
    return result.toLocaleString('es');
  }

  showModal() {
    Swal.fire({
      title: 'Compra exitosa',
      icon: 'success',
      text: 'Pues ver tu factura en tu correo',
      timer: 3000
    });
  }

  ngOnInit(): void {
  }
}
