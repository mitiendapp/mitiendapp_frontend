import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let RegistroUsuarioComponent = class RegistroUsuarioComponent {
    constructor(formBuilder, headerService, toastr, _userService, _messageService) {
        this.formBuilder = formBuilder;
        this.headerService = headerService;
        this.toastr = toastr;
        this._userService = _userService;
        this._messageService = _messageService;
    }
    ngOnInit() {
        this.headerService.hide();
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });
    }
    onRegister() {
        const { name, email, password, confirmPassword } = this.form.value;
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
        console.log(user);
        // this.loading = true;p
        this._userService.signIn(user).subscribe({
            next: (v) => {
                // this.loading = false;
                this.toastr.success("El usuario fue registrado con exito", "Registro exitoso");
                const main = document.getElementById('main');
                main.classList.remove("right-panel-active");
            },
            error: (e) => {
                this._messageService.msgError(e);
                // this.loading = false;
            }
        });
    }
};
RegistroUsuarioComponent = __decorate([
    Component({
        selector: 'app-registro-usuario',
        templateUrl: './registro-usuario.component.html',
        styleUrls: ['./registro-usuario.component.css']
    })
], RegistroUsuarioComponent);
export { RegistroUsuarioComponent };
//# sourceMappingURL=registro-usuario.component.js.map