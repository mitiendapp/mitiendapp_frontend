import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnChanges{
@Input() message!: string;
@Input() color!: string;

left!:boolean;
rounded!:string
text!:string;
back!:string;
shadow!:string;

ngOnChanges(changes: SimpleChanges): void {  
  if(this.color === '#005c4b'){
    this.left = true;
    this.rounded= 'rounded-l-lg rounded-bl-lg'
    this.text = 'text-[#00000]';
    this.back = 'bg-[#37c2f3]';
    this.shadow= 'shadow-lg';
  }else{
    this.left = false;
    this.rounded= 'rounded-r-lg rounded-br-lg'
    this.text = 'text-[#000000]';
    this.back = 'bg-[#9C9C9C]';
  }
}
}
