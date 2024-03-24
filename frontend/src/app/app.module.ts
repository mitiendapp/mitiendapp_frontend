import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './componentes/nav/nav.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { PerfilCompanyComponent } from './componentes/perfil-company/perfil-company.component';
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
import { CreateProductComponent } from './componentes/create-product/create-product.component';
import { ChatbotComponent } from './componentes/chatbot/chatbot.component';
import { MessageBoxComponent } from './componentes/chatbot/message-box/message-box.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';
import { ProductoCarritoComponent } from './componentes/carrito-compra/producto-carrito/producto-carrito.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ImageDirectiveDirective } from './image-directive.directive';
import { CommonModule } from '@angular/common';
import { ChatGoodComponent } from './componentes/chat-good/chat-good.component';
import { SuccessfulPurchaseComponent } from './componentes/successful-purchase/successful-purchase.component';
import { LoadingImageComponent } from './componentes/loading-image/loading-image.component';
import { EditarCompanyComponent } from './componentes/editar-company/editar-company.component';
import { EditProductComponent } from './componentes/edit-product/edit-product.component';
import { SpinnerBladeComponent } from './shared/spinner-blade/spinner-blade.component';
import { CarouselComponent } from './componentes/carousel/carousel.component';
import { MyPurchasesComponent } from './componentes/perfil-usuario/my-purchases/my-purchases.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MyOrdersComponent } from './componentes/perfil-usuario/my-orders/my-orders.component';
import { FotoDePerfilComponent } from './componentes/foto-de-perfil/foto-de-perfil.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { CompaniesComponent } from './componentes/companies/companies.component';
import { PerfilAdminComponent } from './componentes/perfil-admin/perfil-admin.component';
export function tokenGetter() {
  return localStorage.getItem('token')
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    ProductosComponent,
    SpinnerComponent,
    CarritoCompraComponent,
    DetalleComponent,
    PerfilUsuarioComponent,
    PerfilCompanyComponent,
    HomeComponent,
    InicioComponent,
    NavBarComponent,
    RegistroComponent,
    HeaderComponent,
    RegistroUsuarioComponent,
    RegistroNegocioComponent,
    CreateProductComponent,
    ChatbotComponent,
    MessageBoxComponent,
    ProductoCarritoComponent,
    PerfilCompanyComponent,
    ImageDirectiveDirective,
    ChatGoodComponent,
    LoadingImageComponent,
    SuccessfulPurchaseComponent,
    EditarCompanyComponent,
    EditProductComponent,
    SpinnerBladeComponent,
    CarouselComponent,
    MyPurchasesComponent,
    MyOrdersComponent,
    FotoDePerfilComponent,
    CompaniesComponent,
    PerfilAdminComponent,

  ],
  imports: [
    NgxSpinnerModule,
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
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    NgxPaginationModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddTokenInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})



export class AppModule { }
