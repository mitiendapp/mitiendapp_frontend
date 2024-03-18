import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.css']
})
export class MyPurchasesComponent {
  purchases:any[];

  constructor(
    private _clientService:ClientService,
  ){}

  ngOnInit(){
    this._clientService.purchases.subscribe( purchases => {
      this.purchases = purchases;
    })
  }
}
