import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    
    constructor(
        private toastr:ToastrService
    ){
    }

    msgError(e: any, tittle:string="¡Error!"){
        if(e.error.message){
            this.toastr.error(e.error.message, tittle);
            return;
        }
        if (e.message) {
            this.toastr.error(e.message, tittle);
            return;
        } else {
            this.toastr.error("¡Ups! Algo salió mal", tittle);
            return;
        }
    }
    msgSuccess(body:any, tittle:string="¡Exito!"){
        this.toastr.success(body.message, tittle)
    }
    msgWarn(body:any, tittle:string="Alto ahi!"){
        this.toastr.warning(body.message, tittle)
    }
    msgInfo(body:any, tittle:string="¡Hey!"){
        this.toastr.info(body.message, tittle)
    }
}
