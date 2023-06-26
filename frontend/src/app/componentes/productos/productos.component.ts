import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import { productosDisponibles } from 'src/app/models/productos';
import { productosDisponibles } from 'src/app/models/productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
prod = productosDisponibles

constructor(private route: ActivatedRoute, private router: Router) {
    
}

mostrarDetalle(nombre:String) {
  this.router.navigate(['/detalle', nombre]);
}

ngOnInit(): void {
  

  };
  
}





