import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
let PaymentService = class PaymentService {
    constructor(http) {
        this.http = http;
        this.endpoint = enviroment.endpoint;
        this.apiUrl = 'order';
    }
    createOrder() {
        return this.http.post(`${this.endpoint}${this.apiUrl}/create`, {});
    }
};
PaymentService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PaymentService);
export { PaymentService };
//# sourceMappingURL=payment.service.js.map