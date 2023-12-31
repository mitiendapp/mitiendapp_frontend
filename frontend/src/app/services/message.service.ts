import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    
    constructor(
        private toastr:ToastrService
    ){
    }

    msgError(e: HttpErrorResponse, tittle:string="¡Error!"){
        console.log(e);
        
        if (e.error.message) {
            
            this.toastr.error(e.error.message, tittle);
    
        } else {
            this.toastr.error("¡Ups! Algo salió mal", tittle)
        }
    }
    msgSuccess(e:any, tittle:string="¡Exito!"){
        this.toastr.success(e.message, tittle)
    }
}
