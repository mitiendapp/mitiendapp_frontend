import { Location } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService{

  private isShow = new BehaviorSubject<Boolean>(false);

  constructor(
    private location: Location
  ) { this.isShow.next(true);}

  show(){
    this.isShow.next(true);
  }
  hide(){
    this.isShow.next(false);
  }

  isShowing(){
    return this.isShow.asObservable();
  }

  goBack(){
    this.location.back();
  }

}
