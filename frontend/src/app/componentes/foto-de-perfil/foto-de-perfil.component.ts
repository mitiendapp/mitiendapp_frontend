import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { Company } from 'src/app/interfaces/company';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { decodeJWT } from 'src/app/utils/decodeJWT';
import { extraerBase64 } from 'src/app/utils/extraerBase64';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

type usertype = User & Client | User & Company;

@Component({
  selector: 'app-foto-de-perfil',
  templateUrl: './foto-de-perfil.component.html',
  styleUrls: ['./foto-de-perfil.component.css']
})
export class FotoDePerfilComponent implements OnInit {
  user?: usertype;
  imageFile: any;
  isValidImage: any;
  previsualizacion: any;

  constructor(
    private _userService: UserService
  ) { }

  async ngOnInit() {
    this._userService.getUser().subscribe({
      next: (data) => {
        this.user = data.user
      },
      error: (err) => {

      },
      complete: () => {

      }
    });
    // const { user } = await firstValueFrom(this._userService.getUser());
    // this.user = user;
  }
  deleteImageProfile() {
    const user = {
      profile_image: null
    }
    this._userService.updateUser(user, this.user.email).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err: HttpErrorResponse) => {
        if (err.error) console.log(err.error);
      },
      complete() {
        window.location.reload();
      },
    });
  }
  updateImageProfile() {
    console.log(this.user.email);
    const profile_image = {
      profile_image: this.imageFile
    }
    console.log(profile_image);
    const formData = new FormData();
    formData.append('profile_image', this.imageFile);
    this._userService.updateUserImage(formData, this.user.email).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err: HttpErrorResponse) => {
        if (err.error) console.log(err.error);

      },
      complete: () => {
        window.location.reload();
      }
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    if (this.imageFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(this.imageFile);
      this.isValidImage = true;
    } else {
      this.isValidImage = false;
    }
    //  console.log()
    extraerBase64(this.imageFile).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      const url_pura = imagen.base.split(',')[1];
      const imageObject = {
        imagePath: url_pura // Aquí asignamos el contenido base64 como imagePath
      };
    }).catch((error) => {
      console.error('Error al extraer la base64 de la imagen:', error);
    });
    if (this.imageFile) {
      this.updateImageProfile();
    }

  }
}
