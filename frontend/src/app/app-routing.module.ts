import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginRegistroComponent } from './componentes/login-registro/login-registro.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { AuthGuard } from './utils/auth.guard';
import { CarritoCompraComponent } from './componentes/carrito-compra/carrito-compra.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { HomeComponent } from './componentes/home/home.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, {
    path: '', component: HomeComponent
  }, {
    path: 'login',
    component: InicioComponent,
  },
  {
    path: 'signin',
    component: RegistroComponent,
  },
  { path: 'products',
   component: ProductosComponent, canActivate: [AuthGuard] },
  {
    path:'carritoCompra',
    component:CarritoCompraComponent,
  },
  {
    path: 'detalle/:id', component: DetalleComponent
  }, {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
