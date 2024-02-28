import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatbotService } from 'src/app/services/chatbot.service';

interface Respuesta{
  text: string
}
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})

export class ChatbotComponent implements OnInit{
  public form: FormGroup;
  public chat: Array<string> = new Array();

constructor(
  public chatbotService: ChatbotService,
  private formBuilder: FormBuilder,
){

}

ngOnInit(): void {
    this.form = this.formBuilder.group({
      pregunta:['', Validators.required]
    })
}

askChat(){
  const {pregunta}:any = this.form.value
  this.chat.push(pregunta);
  this.chatbotService.chat(pregunta).subscribe(data=>{
    this.chat.push(data.text);
  });
}
}
