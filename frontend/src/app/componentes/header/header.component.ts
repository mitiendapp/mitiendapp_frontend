import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
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
        height:'0'
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

  @Input() itCan = true; 
  @Input() show = true;

  viewCart: boolean = false;
  myCart$ = this.carService.myCart$;

  constructor(
    public headerService: HeaderService,
    private router: Router, private carService:CartService,
    public userService: UserService
  ){
  }

  ngOnInit(): void {
    if((this.router.url == '/')){
      this.activeCanBack()
    }
  }

  onToggleCart() {
    this.viewCart = !this.viewCart

  };

  activeButtonBack(){
    this.itCan = !this.itCan;
  }
  showArrow(){
    this.show = !this.show;
  }
  activeCanBack(){
    setTimeout(() => {
      this.activeButtonBack();
      
    }, 1);
    setTimeout(() => {
      this.showArrow();
      
    }, 2);
  }
}
