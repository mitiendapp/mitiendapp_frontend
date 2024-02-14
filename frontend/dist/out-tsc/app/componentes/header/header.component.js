import { __decorate } from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
let HeaderComponent = class HeaderComponent {
    constructor(headerService, router) {
        this.headerService = headerService;
        this.router = router;
        this.itCan = true;
        this.show = true;
    }
    ngOnInit() {
        if (!(this.router.url == '/')) {
            this.activeCanBack();
        }
    }
    activeButtonBack() {
        this.itCan = !this.itCan;
    }
    showArrow() {
        this.show = !this.show;
    }
    activeCanBack() {
        setTimeout(() => {
            this.activeButtonBack();
        }, 1);
        setTimeout(() => {
            this.showArrow();
        }, 2);
    }
};
__decorate([
    Input()
], HeaderComponent.prototype, "itCan", void 0);
__decorate([
    Input()
], HeaderComponent.prototype, "show", void 0);
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css'],
        animations: [
            trigger('canGoBack', [
                state('can', style({
                    transform: 'translate(0% )scale(1)'
                })),
                state('cant', style({
                    transform: 'translate(70% )scale(1)',
                })),
                transition('can => cant', [
                    animate('0.5s')
                ]),
                transition('cant => can', [
                    animate('0.5s')
                ])
            ]),
            trigger('showArrow', [
                state('show', style({
                    transform: 'translate(0% )scale(0)',
                    opacity: '0',
                    height: '0'
                })),
                state('hide', style({
                    transform: 'translate(0% )scale(1)',
                    opacity: '100'
                })),
                transition('show => hide', [
                    animate('0.5s')
                ]),
                transition('hide => show', [
                    animate('0.5s')
                ])
            ])
        ]
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map