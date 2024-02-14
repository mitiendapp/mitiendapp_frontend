import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
let ProductService = class ProductService {
    constructor(http) {
        this.http = http;
        this.endpoint = enviroment.endpoint;
        this.apiUrl = 'product';
    }
    getProducts() {
        return this.http.get(`${this.endpoint}${this.apiUrl}`);
    }
    getProductById(id) {
        return this.http.get(`${this.endpoint}product/id?id=${id}`);
    }
    create(product) {
        return this.http.post(`${this.endpoint}${this.apiUrl}`, product);
    }
};
ProductService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map