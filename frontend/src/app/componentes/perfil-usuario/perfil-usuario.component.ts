import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Client } from 'src/app/interfaces/client';
import { decodeJWT } from 'src/app/utils/decodeJWT';
import { ClientService } from 'src/app/services/client.service';

@Component({ 
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent {

  user:Client;

  constructor(
    private matTabsModule: MatTabsModule,
  ){}

  ngOnInit(){
    const {UserInfo} = decodeJWT(localStorage.getItem('token'));
    this.user = UserInfo;
  }
}
