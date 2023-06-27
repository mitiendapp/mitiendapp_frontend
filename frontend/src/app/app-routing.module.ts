import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginRegistroComponent } from './componentes/login-registro/login-registro.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { AuthGuard } from './utils/auth.guard';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: 'login',
    component: LoginRegistroComponent,
  }, { path: 'products', component: ProductosComponent, canActivate: [AuthGuard] },
  {
    path: 'perfil',
    component:PerfilUsuarioComponent
  },
  {path: 'detalle/:', component: DetalleComponent},
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
