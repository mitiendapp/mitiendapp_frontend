import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let RegistroComponent = class RegistroComponent {
    constructor(headerService) {
        this.headerService = headerService;
        this.negocioRegister = new BehaviorSubject(false);
        this.userRegister = new BehaviorSubject(true);
        this.mainActive = new BehaviorSubject(false);
    }
    ngOnInit() {
        this.mainActive.next(true);
        this.userRegister.next(false);
        this.headerService.hide();
    }
    registerUser() {
        this.userRegister.next(true);
        this.mainActive.next(false);
    }
    registerNegocio() {
        this.negocioRegister.next(true);
        this.mainActive.next(false);
    }
    isMainActive() {
        return this.mainActive.asObservable();
    }
    isUserRegister() {
        return this.userRegister.asObservable();
    }
    isNegocioRegister() {
        return this.negocioRegister.asObservable();
    }
};
RegistroComponent = __decorate([
    Component({
        selector: 'app-registro',
        templateUrl: './registro.component.html',
        styleUrls: ['./registro.component.css']
    })
], RegistroComponent);
export { RegistroComponent };
//# sourceMappingURL=registro.component.js.map