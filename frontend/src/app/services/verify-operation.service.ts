import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class VerifyOperationService {

  constructor() { }

  async isDelete(name:string){
    const dialog = await Swal.fire({
      title:"¡Cuidado!",
      text: `Estás apunto de eliminar un ${name} \n ¿Seguro que deseas realizar esta acción?`,
      confirmButtonText:"Eliminar",
      confirmButtonColor: "#427ed7",
      showDenyButton:true,
      denyButtonText: "Cancelar",
      focusDeny:true
    })
    if(dialog.isConfirmed){
      return true;
    }
    return false;
  }

  async isUpdate(name:string){
    const dialog = await Swal.fire({
      title:"¡Cuidado!",
      text: `Estás apunto de actualizar un ${name} \n ¿Seguro que deseas realizar esta acción?`,
      confirmButtonText:"Actualizar",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    })
    if(dialog.isConfirmed){
      return true;
    }
    return false;
  }
}
