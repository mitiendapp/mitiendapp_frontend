import { Component } from '@angular/core';
import { productosDisponibles } from 'src/app/models/productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
prod = productosDisponibles

// constructor( private router: Router){

// }
}
