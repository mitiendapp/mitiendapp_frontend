import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let MessageService = class MessageService {
    constructor(toastr) {
        this.toastr = toastr;
    }
    msgError(e, tittle = "¡Error!") {
        console.log(e);
        if (e.error.message) {
            this.toastr.error(e.error.message, tittle);
        }
        else {
            this.toastr.error("¡Ups! Algo salió mal", tittle);
        }
    }
    msgSuccess(e, tittle = "¡Exito!") {
        this.toastr.success(e.message, tittle);
    }
};
MessageService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MessageService);
export { MessageService };
//# sourceMappingURL=message.service.js.map