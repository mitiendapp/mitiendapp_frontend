import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { FiltroProductosService } from 'src/app/services/FiltroProductos.service';
import { AuthService } from 'src/app/services/auth.service';
import { decodeJWT } from 'src/app/utils/decodeJWT';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('canGoBack', [
      state('can', style({
        transform: 'translate(0% )scale(1)'
      })),
      state('cant', style({
        transform: 'translate(70% )scale(1)',
      })),
      transition('can => cant', [
        animate('0.5s')
      ]),
      transition('cant => can', [
        animate('0.5s')
      ])
    ]),
    trigger('showArrow', [
      state('show', style({
        transform: 'translate(0% )scale(0)',
        opacity: '0',
        height: '0'
      })),
      state('hide', style({
        transform: 'translate(0% )scale(1)',
        opacity: '100'
      })),
      transition('show => hide', [
        animate('0.5s')
      ]),
      transition('hide => show', [
        animate('0.5s')
      ])
    ])

  ]
})


export class HeaderComponent implements OnInit {
filtrarProductos(arg0: any) {
throw new Error('Method not implemented.');
}

  @Input() itCan = true;
  @Input() show = true;

  viewCart: boolean = false;
  myCart$ = this.carService.myCart$;
  userEmail: string = '';
  userInfo:any;
  tokenEmail:any;
  constructor(
    public headerService: HeaderService,
    private router: Router, private carService: CartService,
    public userService: UserService,
    private filterProductService: FiltroProductosService,
    public cartService:CartService,
    public auth: AuthService,
    private routeActivate: ActivatedRoute
  ) {

  }

  navigateToUserProfile() {
    this.router.navigate(['perfilusuario']);
  }

  isPerfilCompanyComponent(): boolean {
    return this.router.url.includes('perfilCompany/');
  }
  
  navigateToCompanyHome() {
  
   
    this.router.navigate(['']);
  
  }

  navigateToCompanyProfile() {
    this.userInfo = decodeJWT(localStorage.getItem('token'));
    // console.log(this.userInfo.UserInfo.email,' este es');
    // console.log(this.userInfo.UserInfo.id,"aqui esta solo sin variables");
    // let email = this.routeActivate.snapshot.params['companyId'];
    // console.log(email, 'aqui estoy capturando el params osea el correo en el header')
    this.tokenEmail = this.userInfo.UserInfo.email
    console.log(this.userInfo.UserInfo.id,"aqui esta solo sin variables");
    
    console.log(this.tokenEmail,'este es el token cuando se preciona el perfil' )
   
    this.router.navigate(['perfilCompany',this.tokenEmail]);
  
  }

  actualizarFiltro(event: any) {
    const filtro = event.target.value;
    if (filtro.trim() === '') {
      this.filterProductService.actualizarFiltro(''); // Restaurar filtro
    } else {
      this.filterProductService.actualizarFiltro(filtro);
    }
  }
  

 
  ngOnInit(): void {
    if ((this.router.url == '/')) {
      //this.activeCanBack();

      
    }
  

    
  }

  onToggleCart() {
    this.viewCart = !this.viewCart

  };

  activeButtonBack() {
    this.itCan = !this.itCan;
  }
  showArrow() {
    this.show = !this.show;
  }
  activeCanBack() {
    setTimeout(() => {
      this.activeButtonBack();

    }, 1);
    setTimeout(() => {
      this.showArrow();

    }, 2);
  }

}