import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { BehaviorSubject } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('chatbot') private modal: ChatbotComponent;
  thereOffers = new BehaviorSubject<Boolean>(false);

  constructor(
    private ngCarousel: NgbCarouselModule,
    private headerService: HeaderService,
  ) {

  }
  ngOnInit(): void {

    if (false) {
      this.thereOffers.next(true);
    }
  }
  thereAreOffers() {
    return this.thereOffers.asObservable();
  }

  async openModal(){
    return await this.modal.open();
  }
}
