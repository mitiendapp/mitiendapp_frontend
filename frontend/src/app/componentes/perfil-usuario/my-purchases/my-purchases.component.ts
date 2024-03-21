import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProductDTO } from 'src/app/services/cart.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.css']
})
export class MyPurchasesComponent implements OnInit{
  purchases:ProductDTO[];

  constructor(
    private _clientService:ClientService,
  ){}

  async ngOnInit(){
    let purchases = await firstValueFrom(this._clientService.purchases());
    this.purchases= purchases;
  }
}
