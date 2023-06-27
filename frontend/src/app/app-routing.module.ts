import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegistroComponent } from './componentes/login-registro/login-registro.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { AuthGuard } from './utils/auth.guard';
import { DetalleProductoComponent } from './componentes/detalle-producto/detalle-producto.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: 'login',
    component: LoginRegistroComponent,
  }, {
     path: 'products',
     component: ProductosComponent,
      canActivate: [AuthGuard] 
  },
  {
      path: 'details',
      component: DetalleProductoComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
