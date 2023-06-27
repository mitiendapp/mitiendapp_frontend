import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';

// import { productosDisponibles } from 'src/app/models/productos';
import { productosDisponibles } from 'src/app/models/productos';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listProducts: Product[] = []

  constructor(
    private _productService: ProductService,
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
  mostrarDetalle(nombre: String) {
    this.router.navigate(['/detalle', nombre]);
  }

}





