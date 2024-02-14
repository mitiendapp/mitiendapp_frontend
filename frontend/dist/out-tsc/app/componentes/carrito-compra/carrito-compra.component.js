import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
let CarritoCompraComponent = class CarritoCompraComponent {
    constructor(_cartService) {
        this._cartService = _cartService;
        this.products = [];
        this.title = 'sweetAlert';
    }
    showModal() {
        Swal.fire({
            title: 'Compra exitosa',
            icon: 'success',
            text: 'Pues ver tu factura en tu correo',
            timer: 3000
        });
    }
    ngOnInit() {
        this.getProducts();
    }
    getProducts() {
        this._cartService.getProducts().subscribe((data) => {
            this.products = data.data;
            console.log(data.data);
        });
    }
};
CarritoCompraComponent = __decorate([
    Component({
        selector: 'app-carrito-compra',
        templateUrl: './carrito-compra.component.html',
        styleUrls: ['./carrito-compra.component.css']
    })
], CarritoCompraComponent);
export { CarritoCompraComponent };
//# sourceMappingURL=carrito-compra.component.js.map