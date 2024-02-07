import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit{
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private headerService:HeaderService
  ){

  }

  ngOnInit(): void {
      this.headerService.hide();
  }
}
