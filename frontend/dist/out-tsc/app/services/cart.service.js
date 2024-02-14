import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
let CartService = class CartService {
    constructor(http) {
        this.http = http;
        this.endpoint = enviroment.endpoint;
        this.apiUrl = 'cart';
    }
    getProducts() {
        return this.http.get(`${this.endpoint}${this.apiUrl}/get`);
    }
    create(product) {
        return this.http.post(`${this.endpoint}${this.apiUrl}/add`, product);
    }
};
CartService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CartService);
export { CartService };
//# sourceMappingURL=cart.service.js.map