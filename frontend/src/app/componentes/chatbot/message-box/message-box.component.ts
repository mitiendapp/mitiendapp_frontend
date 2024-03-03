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

ngOnChanges(changes: SimpleChanges): void {
    
  if(this.color==='#005c4b'){
    this.left = true;
    this.rounded= 'rounded-l-lg rounded-bl-lg'
    this.text = `text-[#005c4b]`;
    this.back = `bg-[#005c4b]`;
  }else{
    this.left = false;
    this.rounded= 'rounded-r-lg rounded-br-lg'
    this.text = `text-[#000000]`;
    this.back = `bg-[#ffffff]`;
  }
}
}
