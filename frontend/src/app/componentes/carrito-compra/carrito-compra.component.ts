import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom, timer } from 'rxjs';
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
  loading = new BehaviorSubject<boolean>(false);
  myCart$ = this._cartService.myCart$;

  viewCart: boolean = false;
  constructor(
    private _cartService: CartService,
    private messageService: MessageService,
    private _paymentService: PaymentService
  ) {

  }
  // createOrder() {
  //   this._paymentService.createOrder("").subscribe((data: any) => {
  //     console.log(data);
  //     window.location.href = data.init_point
  //   })
  // }
  async createOrder(){
    const cart = await firstValueFrom(this._cartService.myCart$);
    let products = "";
    cart.forEach((e)=>products+= e.name+", " );
    const resCart = {
      price: this._cartService.totalCart(),
      image: "https://res.cloudinary.com/dd4lro4xw/image/upload/v1710115455/ffdsvpms7mwmt2mo9ul7.jpg",
      description:products
    }
    this.loading.next(true);
    this._paymentService.prepareCartOrder(resCart).then(async (data) => {
      let order = await firstValueFrom(this._paymentService.createOrder(data));
      this.loading.next(false);
      window.location.href = `https://checkout.wompi.co/l/${order.payment}`
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
  isLoading() {
    return this.loading.asObservable();
  }
}
