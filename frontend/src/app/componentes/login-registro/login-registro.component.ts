import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';


@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
export class LoginRegistroComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup
  products: any;

  constructor(private fb: FormBuilder, private client: ClientService, private router: Router){

  }

  
 
 

  ngOnInit(): void {
    localStorage.setItem("token", "ahsdgjfdagjsdfasgdjsadgsa");
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required],
      adress: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.form2 = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    this.dom()
  }
  


  onSubmitR(){
    if (this.form.valid) {
      this.client.postRequest("http://localhost:10101/register",
      {
        name: this.form.value.name,   //valor de los labels
        email: this.form.value.email,
        number: this.form.value.number,
        adress: this.form.value.adress,
        password: this.form.value.password
      }, undefined, {"Authorization": `Bearer ${localStorage.getItem("token")}`}).subscribe(
        ((response: any) => {
          console.log(response);   
        }), 
        ((error: any) => {
          console.log("error");
        })
      )

    }else{
      console.log("Verifique sus datos");
    }

  }

  dom() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const main = document.getElementById('main');

    signUpButton.addEventListener('click', () => {
        main.classList.add("right-panel-active");
    });
    signInButton.addEventListener('click', () => {
        main.classList.remove("right-panel-active");
    });
  }

  onSubmitL() {
    if (this.form2.valid) {
      this.client.postRequest("http://localhost:10101/login",
      {  
        email: this.form2.value.email,
        password: this.form2.value.password
      }, undefined, {"Authorization": `Bearer ${localStorage.getItem("token")}`}).subscribe(
        ((response: any) => {
          console.log(response); 
         
           
        }), 
        ((error: any) => {
          console.log(error);
        })

        
      )

    }else{
      console.log("Verifique sus datos");
    }
    
  }
 

}
