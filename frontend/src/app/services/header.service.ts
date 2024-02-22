import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService{

  private isShow = new BehaviorSubject<Boolean>(true);

  constructor() { this.isShow.next(true);}

  show(){
    this.isShow.next(true);
  }
  hide(){
    this.isShow.next(false);
  }

  isShowing(){
    return this.isShow.asObservable();
  }
}
