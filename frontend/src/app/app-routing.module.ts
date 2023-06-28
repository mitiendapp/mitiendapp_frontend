import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginRegistroComponent } from './componentes/login-registro/login-registro.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { AuthGuard } from './utils/auth.guard';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, {
    path: '', component: HomeComponent
  }, {
    path: 'login',
    component: LoginRegistroComponent,
  }, {
    path: 'products', component: ProductosComponent, canActivate: [AuthGuard]
  }, {
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
