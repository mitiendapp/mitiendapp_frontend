import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltroProductosService {
  private filtroProductosSubject = new BehaviorSubject<string>('');
  filtroProductos$ = this.filtroProductosSubject.asObservable();

  constructor() { }

  actualizarFiltro(filtro: string) {
    this.filtroProductosSubject.next(filtro);
  }
}
