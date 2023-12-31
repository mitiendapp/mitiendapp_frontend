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
import { SidebarsComponent } from './componentes/sidebars/sidebars.component';
import { CarritoCompraComponent } from './componentes/carrito-compra/carrito-compra.component';

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
    SidebarsComponent,
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
