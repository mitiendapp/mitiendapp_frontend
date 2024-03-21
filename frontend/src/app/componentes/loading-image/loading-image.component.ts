import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading-image',
  templateUrl: './loading-image.component.html',
  styleUrls: ['./loading-image.component.css']
})
export class LoadingImageComponent implements OnInit {
  @Input() src: string;
  @Input() srcPreload: string;
  @Input() srcError: string;
  @Input() rounded?: string | undefined;
  public imgSrc: string;
  private tmpImage: HTMLImageElement;


  constructor() { }


  ngOnInit() {
    console.log(this.src);
    this.imgSrc = this.srcPreload;
    if (this.tmpImage) {
      this.tmpImage.onload = null;
    }

    let loaded = () => {
      this.imgSrc = this.src;
    };

    let imgError = () => {
      console.error('Error al cargar la imagen', this.imgSrc);
      this.imgSrc = this.srcError;
    };

    this.tmpImage = new Image();
    this.tmpImage.onload = loaded;
    this.tmpImage.onerror = imgError;
    this.tmpImage.src = this.src;
  }
}
