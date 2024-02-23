import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'
import { BehaviorSubject } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  thereOffers = new BehaviorSubject<Boolean>(false);

  constructor(
    private ngCarousel: NgbCarouselModule,
    private headerService: HeaderService
  ){

  }
  ngOnInit(): void {

      if(false){
        this.thereOffers.next(true);
      }
  }
  thereAreOffers(){
    return this.thereOffers.asObservable();
  }
}
