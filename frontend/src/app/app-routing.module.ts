import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginRegistroComponent } from './componentes/login-registro/login-registro.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';


const routes: Routes = [
  {path: '', component: LoginRegistroComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'detalle/:', component: DetalleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
