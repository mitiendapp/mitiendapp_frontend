import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let LoginRegistroComponent = class LoginRegistroComponent {
    constructor(fb, _userService, router, toastr, _messageService) {
        this.fb = fb;
        this._userService = _userService;
        this.router = router;
        this.toastr = toastr;
        this._messageService = _messageService;
        this.loading = false;
    }
    ngOnInit() {
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });
        this.form2 = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.dom();
    }
    onSubmitR() {
        const { email, password, confirmPassword } = this.form.value;
        if (!this.form.valid) {
            this.toastr.error("Todos los campos son obligatorios", "Error");
            return;
        }
        if (password != confirmPassword) {
            this.toastr.error("las contraseñas no coinciden", "Error");
            return;
        }
        const user = {
            email: email,
            password: password,
        };
        this.loading = true;
        this._userService.signIn(user).subscribe({
            next: (v) => {
                this.loading = false;
                this.toastr.success("El usuario fue registrado con exito", "Registro exitoso");
                const main = document.getElementById('main');
                main.classList.remove("right-panel-active");
            },
            error: (e) => {
                this._messageService.msgError(e);
                this.loading = false;
            }
        });
    }
    dom() {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const main = document.getElementById('main');
        signUpButton.addEventListener('click', () => {
            main.classList.add("right-panel-active");
        });
        signInButton.addEventListener('click', () => {
            main.classList.remove("right-panel-active");
        });
    }
    onSubmitL() {
        const { email, password } = this.form2.value;
        if (!this.form2.valid) {
            this.toastr.error("Correo y contraseña son requeridos", "Error");
            return;
        }
        const user = {
            email: email,
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
};
LoginRegistroComponent = __decorate([
    Component({
        selector: 'app-login-registro',
        templateUrl: './login-registro.component.html',
        styleUrls: ['./login-registro.component.css'],
    })
], LoginRegistroComponent);
export { LoginRegistroComponent };
//# sourceMappingURL=login-registro.component.js.map