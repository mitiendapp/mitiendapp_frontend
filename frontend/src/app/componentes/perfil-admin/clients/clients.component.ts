import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import {PerfilCompanyService} from 'src/app/services/perfil-company.service'
import { Client } from 'src/app/interfaces/client';
import { User } from 'src/app/interfaces/user';

// type clientType =  Client;
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  clients: (Client & User)[] = [];
  
  constructor(private _clientService:ClientService){

  }

ngOnInit(): void {
   
  this._clientService.getClients().subscribe(clients => {
    console.log(clients);
    this.clients = clients.clients;
    console.log(this.clients,"esta sirviendo guarda la data")
  })
}
}



