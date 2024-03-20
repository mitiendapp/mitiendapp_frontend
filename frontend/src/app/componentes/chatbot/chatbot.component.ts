import { Mensaje } from 'src/app/interfaces/mensaje';
import { Component, ElementRef, Inject, Input, OnChanges, OnInit, QueryList, SimpleChanges, TemplateRef, Type, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ChatbotService } from 'src/app/services/chatbot.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from 'src/app/interfaces/modal';
import { log } from 'console';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})

export class ChatbotComponent implements OnInit{
  @Input() public modalConfig: ModalConfig;
  @ViewChild('chatbot') private modalContent: TemplateRef<ChatbotComponent>
  private modalRef: NgbModalRef
  public form: FormGroup
  public chat: Array<Mensaje> = new Array(); 
  public scrollDiv;
  public messageTest:any;
  constructor(
    public chatbotService: ChatbotService,
    private formBuilder: FormBuilder,
    public userService: UserService,
    public modalService: NgbModal,
  ) {
  }
  ngOnInit(): void {
    
    if (this.userService.currentUser == null || this.userService.currentUser == undefined) {
      this.userService.currentUser = {
        email: "invitado",
        password: null
      }
    }
    this.form = this.formBuilder.group({
      pregunta: ['', Validators.required]
    })
  }
  askCha2t() {
    const message = this.form.controls['pregunta'].value;
    // Aquí puedes enviar el mensaje a través de tu servicio o realizar otras acciones necesarias
    this.form.controls['pregunta'].setValue(''); // Limpiar el campo de texto después de enviar el mensaje
}
askChat2() {
  this.loading = true; // Mostrar el spinner
  const { pregunta }: any = this.form.value;
  this.askCha2t() 
  const mensaje = {
    text: pregunta,
    from: this.userService.currentUser.email
  }
  this.chat.push(mensaje);
  this.chatbotService.chat(pregunta).subscribe({
    next: (data) => {
      this.chat.push(data);
      this.loading = false; // Ocultar el spinner después de recibir la respuesta
    }
  });
}


  askChat() {
    const { pregunta }: any = this.form.value
    this.askCha2t() 
    const mensaje = {
      text: pregunta,
      from: this.userService.currentUser.email
      
    }
    this.chat.push(mensaje);
    this.chatbotService.chat(pregunta).subscribe({
      next: (data) => {
        this.chat.push(data);
        
        
      }
    });

  }
  loading: boolean = false;

  onSubmit() {
    this.loading = true;
    // Simulando una operación asíncrona
    setTimeout(() => {
      this.loading = false;
    }, 2000); // Cambia esto por la lógica de tu aplicación
  }




  

  clearAsk(){
    this.messageTest=document.getElementById("makeAsk")
    console.log(this.messageTest)
  }

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.modalRef = this.modalService.open(this.modalContent, {
        centered: false,
        size: "s",
         
        modalDialogClass: "modal-content"
      })
      this.modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
  }
}
