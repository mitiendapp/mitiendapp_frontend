import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let HomeComponent = class HomeComponent {
    constructor(ngCarousel) {
        this.ngCarousel = ngCarousel;
        this.thereOffers = new BehaviorSubject(false);
    }
    ngOnInit() {
        if (false) {
            this.thereOffers.next(true);
        }
    }
    thereAreOffers() {
        return this.thereOffers.asObservable();
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css'],
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map