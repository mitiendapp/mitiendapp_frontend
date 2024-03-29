import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NavComponent } from './componentes/nav/nav.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { LoginRegistroComponent } from './componentes/login-registro/login-registro.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { HomeComponent } from './componentes/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarritoCompraComponent } from './componentes/carrito-compra/carrito-compra.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HeaderComponent } from './componentes/header/header.component';
import { RegistroUsuarioComponent } from './componentes/registro/registro-usuario/registro-usuario.component';
import { RegistroNegocioComponent } from './componentes/registro/registro-negocio/registro-negocio.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    LoginRegistroComponent,
    ProductosComponent,
    SpinnerComponent,
    CarritoCompraComponent,
    DetalleComponent,
    PerfilUsuarioComponent,
    HomeComponent,
    InicioComponent,
    NavBarComponent,
    RegistroComponent,
    HeaderComponent,
    RegistroUsuarioComponent,
    RegistroNegocioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddTokenInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
