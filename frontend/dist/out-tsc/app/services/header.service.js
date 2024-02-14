import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let HeaderService = class HeaderService {
    constructor() {
        this.isShow = new BehaviorSubject(false);
        this.isShow.next(true);
    }
    show() {
        this.isShow.next(true);
    }
    hide() {
        this.isShow.next(false);
    }
    isShowing() {
        return this.isShow.asObservable();
    }
};
HeaderService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], HeaderService);
export { HeaderService };
//# sourceMappingURL=header.service.js.map