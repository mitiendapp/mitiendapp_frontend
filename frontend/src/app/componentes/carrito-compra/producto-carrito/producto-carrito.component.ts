import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService, ProductDTO } from 'src/app/services/cart.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-producto-carrito',
  templateUrl: './producto-carrito.component.html',
  styleUrls: ['./producto-carrito.component.css']
})
export class ProductoCarritoComponent {

  @Input('product') product;

  constructor(
    private _cartService: CartService,
    private messageService: MessageService
  ) {

  }

  totalProduct(price: number, units: number) {
    const total = price * units;
    return total.toLocaleString('es');
  }
  deleteProduct(id: number) {
    this._cartService.deleteProduct(id);
    this.messageService.msgSuccess("El producto se eliminó");
  }

  add(product:ProductDTO){
    if(product.stock < 1){
      this.messageService.msgError(null,"Stock insuficiente")
      return;
    }
    product.quantity++;
    product.stock--;
    this._cartService.myCart$.forEach((e)=>{console.log(e);
    })
  }

  minus(product:ProductDTO){
    if(product.quantity < 1){
      this._cartService.deleteProduct(product.id);
    }
    product.quantity--;
    product.stock++;

  }

}
