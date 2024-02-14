import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
let AddTokenInterceptor = class AddTokenInterceptor {
    constructor(router, _messageService) {
        this.router = router;
        this._messageService = _messageService;
    }
    intercept(request, next) {
        const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }
        return next.handle(request).pipe(catchError((error) => {
            if (error.status === 401 || error.status === 403) {
                this._messageService.msgError(error);
                this.router.navigate(['/login']);
            }
            return throwError(() => {
                new Error('Error');
            });
        }));
    }
};
AddTokenInterceptor = __decorate([
    Injectable()
], AddTokenInterceptor);
export { AddTokenInterceptor };
//# sourceMappingURL=add-token.interceptor.js.map