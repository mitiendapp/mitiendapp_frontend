import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { BehaviorSubject } from 'rxjs';
let UserService = class UserService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.isLoggedIn = false;
        this.isLoggingIn = new BehaviorSubject(false);
        this.endpoint = enviroment.endpoint;
        this.apiUrl = 'user';
    }
    isLoginComponentActive() {
        return this.isLoggingIn.asObservable();
    }
    signIn(user) {
        return this.http.post(`${this.endpoint}${this.apiUrl}/register`, user);
    }
    logIn(user) {
        return this.http.post(`${this.endpoint}${this.apiUrl}/login`, user);
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map