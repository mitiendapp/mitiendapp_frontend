import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { decodeJWT } from 'src/app/utils/decodeJWT';
@Component({ 
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent {

  user:Client;

  constructor(
    private matTabsModule: MatTabsModule,
    private clientService: ClientService
  ){}

  ngOnInit(){
    const {UserInfo} = decodeJWT(localStorage.getItem('token'));
    this.clientService.find(UserInfo.email).subscribe(client=>{
      console.log(client);  
      this.user = client.client;
    })
  }
}
