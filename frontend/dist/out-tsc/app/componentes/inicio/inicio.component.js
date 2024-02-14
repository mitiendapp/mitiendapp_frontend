import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
let InicioComponent = class InicioComponent {
    constructor(formBuilder, router, userService, toastr, _userService, _messageService, headerService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userService = userService;
        this.toastr = toastr;
        this._userService = _userService;
        this._messageService = _messageService;
        this.headerService = headerService;
        this.loading = false;
        this.validAccount = new BehaviorSubject(false);
        if (this.router.url === '/login') {
            userService.isLoggingIn.next(true);
        }
        else {
            userService.isLoggingIn.next(false);
        }
    }
    ngOnInit() {
        this.formAccount = this.formBuilder.group({
            email: ['', Validators.required]
        });
        this.formPassword = this.formBuilder.group({
            password: ['', Validators.required]
        });
        this.headerService.hide();
    }
    submitAccount() {
        const { email } = this.formAccount.value;
        console.log(email);
        if (!this.formAccount.valid) {
            this.toastr.error("Debe ingresar su correo o telefono", "Error");
            return;
        }
        this.account = email;
        this.validAccount.next(true);
        console.log(this.account);
        return;
    }
    submitPassword() {
        const { password } = this.formPassword.value;
        if (!this.formPassword.valid) {
            this.toastr.error("Debe ingresar la contraseña", "Error");
            return;
        }
        const user = {
            email: this.account,
            password: password
        };
        this._userService.logIn(user).subscribe({
            next: (data) => {
                this.router.navigate(['products']);
                localStorage.setItem('token', data.token);
                this._messageService.msgSuccess(data);
                this._userService.isLoggedIn = true;
            },
            error: (e) => {
                this._messageService.msgError(e);
                this.loading = false;
            }
        });
    }
    isValidAccount() {
        return this.validAccount.asObservable();
    }
};
InicioComponent = __decorate([
    Component({
        selector: 'app-inicio',
        templateUrl: './inicio.component.html',
        styleUrls: ['./inicio.component.css']
    })
], InicioComponent);
export { InicioComponent };
//# sourceMappingURL=inicio.component.js.map