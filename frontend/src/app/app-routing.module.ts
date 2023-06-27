import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegistroComponent } from './componentes/login-registro/login-registro.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { AuthGuard } from './utils/auth.guard';
import { DetallesComponent } from './componentes/detalles/detalles.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';

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
    path:'detalles',
    component: DetallesComponent
  },
  {
    path: 'perfil',
    component:PerfilUsuarioComponent
  },
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
