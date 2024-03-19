import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService, ProductDTO } from 'src/app/services/cart.service';
import { MessageService } from 'src/app/services/message.service';
import { VerifyOperationService } from 'src/app/services/verify-operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-carrito',
  templateUrl: './producto-carrito.component.html',
  styleUrls: ['./producto-carrito.component.css']
})
export class ProductoCarritoComponent {

  @Input('product') product;
  constructor(
    private _cartService: CartService,
    private messageService: MessageService,
    private verify: VerifyOperationService
  ) {

  }

  totalProduct(price: number, units: number) {
    const total = price * units;
    return total.toLocaleString('es');
  }
  deleteProduct(id: number) {
    const operation = this.verify.isDelete("producto de tu carrito");
    if (operation) {
      this._cartService.deleteProduct(id);
      this.messageService.msgSuccess({ message: "El producto se eliminó correctamente" });
    } else {
      this.messageService.msgInfo({ message: "La operación ha sido cancelada" });
    }
  }


  add(product: ProductDTO) {
    if (product.stock < 1) {
      this.messageService.msgError({ message: "Stock insuficiente" })
      return;
    }
    product.quantity++;
    product.stock--;
  }

  minus(product: ProductDTO) {
    if (product.quantity == 1) {
      this._cartService.deleteProduct(product.id);
    }
    product.quantity--;
    product.stock++;
  }

}
