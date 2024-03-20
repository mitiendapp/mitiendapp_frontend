import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { firstValueFrom } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { User } from 'src/app/interfaces/user';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';
import { decodeJWT } from 'src/app/utils/decodeJWT';
import { extraerBase64 } from 'src/app/utils/extraerBase64';

type usertype = User & Client;
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent {
  user: usertype;
  imageFile: any;
  isValidImage: any;
  previsualizacion:any;

  constructor(

    private matTabsModule: MatTabsModule,
    private clientService: ClientService,
    private _userService: UserService
  ) { }

  async ngOnInit() {
    const { UserInfo } = decodeJWT(localStorage.getItem('token'));

    this.clientService.find(UserInfo.email).subscribe(client => {
      console.log(client);
      this.user = client.client;
    })
  }
}
