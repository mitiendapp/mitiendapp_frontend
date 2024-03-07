import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './componentes/productos/productos.component';
import { AuthGuard } from './utils/auth.guard';
import { CarritoCompraComponent } from './componentes/carrito-compra/carrito-compra.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { HomeComponent } from './componentes/home/home.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RegistroNegocioComponent } from './componentes/registro/registro-negocio/registro-negocio.component';
import { PerfilCompanyComponent } from './componentes/perfil-company/perfil-company.component'
import { CreateProductComponent } from './componentes/create-product/create-product.component'
import { ChatbotComponent } from './componentes/chatbot/chatbot.component';
import { authGuardExample } from './utils/guard_example';
import { createProductsguard } from './utils/guard_CreateProduc';

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
  {
    path: 'products',
    component: ProductosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'carritoCompra',
    component: CarritoCompraComponent,
  },

  {
    path: 'registronegocio',
    component: RegistroNegocioComponent,
  },
  {
    path: 'perfilusuario',
    component: PerfilUsuarioComponent,canActivate: [AuthGuard]
  },

  {
    path: 'crearproducto',
    component: CreateProductComponent, canActivate: [authGuardExample]
  },
  {
    path: 'chatbot',
    component: ChatbotComponent, canActivate: [authGuardExample]
  },
  {
    path: 'detalle/:id',
    component: DetalleComponent
  // }, {
  //   path: 'perfilCompany',
  //   component: PerfilCompanyComponent
  }, {
    path: 'perfilCompany/:document',
    component: PerfilCompanyComponent
  },{
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
