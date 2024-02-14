import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProductosComponent = class ProductosComponent {
    constructor(_productService, _cartService, route, router) {
        this._productService = _productService;
        this._cartService = _cartService;
        this.route = route;
        this.router = router;
        this.listProducts = [];
    }
    ngOnInit() {
        this.getProducts();
    }
    getProducts() {
        this._productService.getProducts().subscribe((data) => {
            this.listProducts = data.data;
        });
    }
    mostrarDetalle(id) {
        this.router.navigate(['/detalle', id]);
    }
    agregarAlCarrito(id) {
        this.getProduct(id);
        setTimeout(() => {
            // console.log(this.product);
            this.addProduct(this.product);
            // localStorage.setItem('producto', JSON.stringify(this.product))
        }, 1000);
        //this.router.navigate(['carritoCompra']);
    }
    getProduct(id) {
        this._productService.getProductById(id).subscribe((data) => {
            this.product = data.data;
        });
    }
    addProduct(product) {
        this._cartService.create(product).subscribe((data) => {
            console.log(data);
        });
    }
};
ProductosComponent = __decorate([
    Component({
        selector: 'app-productos',
        templateUrl: './productos.component.html',
        styleUrls: ['./productos.component.css']
    })
], ProductosComponent);
export { ProductosComponent };
//# sourceMappingURL=productos.component.js.map