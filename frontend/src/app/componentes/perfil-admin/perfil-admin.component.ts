import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { decodeJWT } from 'src/app/utils/decodeJWT';

type admintype=  User;
@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent {

  user:admintype;
  imageFile: any;
  isValidImage: any;
  previsualizacion:any;

  constructor( private _userService: UserService,
    ){}

    async ngOnInit() {
      const { UserInfo } = decodeJWT(localStorage.getItem('token'));
  
      this._userService.find(UserInfo.email).subscribe(client => {
        console.log(client);
        this.user = client.client;
      })
    }

}
