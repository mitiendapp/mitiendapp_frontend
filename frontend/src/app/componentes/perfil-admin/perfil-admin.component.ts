import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { firstValueFrom } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { User } from 'src/app/interfaces/user';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';
import { decodeJWT } from 'src/app/utils/decodeJWT';
import { extraerBase64 } from 'src/app/utils/extraerBase64';

type usertype = User;

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent {

  user: usertype;
  imageFile: any;
  isValidImage: any;
  previsualizacion:any;

  constructor( private _userService: UserService,
    ){}

    async ngOnInit() {
      const { UserInfo } = decodeJWT(localStorage.getItem('token'));
  
      this._userService.find(UserInfo.email).subscribe(user => {
        console.log(user);
        this.user = user.user;
      })
    }

}
