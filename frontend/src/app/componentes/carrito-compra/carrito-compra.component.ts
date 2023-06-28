import { Component } from '@angular/core';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css']
})
export class CarritoCompraComponent {
  title = 'sweetAlert'
  showModal(){
    Swal.fire({
      title: 'Compra exitosa',
      icon:'success',
      text:'Pues ver tu factura en tu correo',
      timer: 3000
  });
  }

}
