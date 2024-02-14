import { __decorate } from "tslib";
import { Component } from '@angular/core';
let NavComponent = class NavComponent {
    constructor(router, _userService) {
        this.router = router;
        this._userService = _userService;
        this.isLoged = false;
    }
    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event.constructor.name === "NavigationEnd") {
                this.isLoged = this._userService.isLoggedIn;
            }
        });
    }
    logOut() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
        this._userService.isLoggedIn = false;
    }
};
NavComponent = __decorate([
    Component({
        selector: 'app-nav',
        templateUrl: './nav.component.html',
        styleUrls: ['./nav.component.css']
    })
], NavComponent);
export { NavComponent };
//# sourceMappingURL=nav.component.js.map