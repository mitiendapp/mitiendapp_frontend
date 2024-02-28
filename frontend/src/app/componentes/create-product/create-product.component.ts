import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { IaImageServicesService } from 'src/app/services/ia-image.services.service';
import { enviroment } from '../../enviroments/enviroment';

import { HeaderService } from 'src/app/services/header.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';
import { log } from 'console';
import { DomSanitizer } from '@angular/platform-browser';
import { resolve } from 'path';
import { rejects } from 'assert';
import { image } from 'pdfkit';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  form: FormGroup;
    public  previsualizacion :string;
  public archivos: any = [];
  private url_image_ia:string;


  constructor(
    private formBuilder: FormBuilder,
    private headerService: HeaderService,
    private toastr: ToastrService,
    private _messageService: MessageService,
    private _productService: ProductService,
    private sanitizer: DomSanitizer,
    private _iaimage:IaImageServicesService
  ) {

    this.url_image_ia= enviroment.url_image_ia;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      stock: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  onCreateProduct() {
    const { name, description, price, image, stock, state } = this.form.value;
    if (!this.form.valid) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    const product: Product = {
      name: name,
      description: description,
      price: price,
      image: image,
      stock: stock,
      state: state,
    };
     
    this._productService.create(product).subscribe({
      next: (v) => {
        this.toastr.success('Producto cargadoExitosamente');
        // const main = document.getElementById('main');
        // main.classList.remove("right-panel-active");
      },
      error: (e: HttpErrorResponse) => {
        if (e) {
          this._messageService.msgError(e);
        } else {
          console.error('Error desconocido al intentar Cargar el producto');
        }
      },
    });
  }


  // capturarImagen(image){
   
   
    
  // }

 analizarImagen(imageObject) {
    this._iaimage.postIaImage(imageObject).subscribe({
      next: (v) => {
        if (v.result === " No") { // Verifica si la respuesta indica que la imagen no es oxena
          this.toastr.success('Imagen Permitida, no es oxena');
          console.log(v.result);
          
        } else  {
          this.toastr.error('Imagen no permitida, es oxena'); // Muestra un mensaje de error si la imagen es oxena
          console.log(v.result);
        }
      },
      error: (e: HttpErrorResponse) => {
        if (e && e.error) { 
          this._messageService.msgError(e.error); 
        } else {
          console.error('Error desconocido al intentar procesar la imagen');
        }
      },
    });
  }
  

  // capturarFile(event) {
  //   const archivoCapturado = event.target.files[0];
  //   this.extraerBase64(archivoCapturado).then((imagen: any) => {
  //     this.previsualizacion = imagen.base;
  //     const url_pura = imagen.base.split(',')[1];
  //     console.log(imagen.base.split(',')[1]);
  
  //     const imageObject = {
  //       imagePath: url_pura // Aquí asignamos el contenido base64 como imagePath
  //     };
  
  //     this._iaimage.postIaImage(imageObject).subscribe({
  //       next: (v) => {
  //         this.toastr.success('Imagen Permitida no es oxena');
  //       },
  //       error: (e: HttpErrorResponse) => {
  //         if (e) {
  //           this._messageService.msgError(e);
  //         } else {
  //           console.error('error',e);
  //         }
  //       },
  //     });
  //   });
  // }

  capturarFile(event) {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      const url_pura = imagen.base.split(',')[1];
      console.log(imagen.base.split(',')[1]);
  
      const imageObject = {
        imagePath:url_pura // Aquí asignamos el contenido base64 como imagePath
      };
      this.analizarImagen(imageObject)


 
    }).catch((error) => {
      console.error('Error al extraer la base64 de la imagen:', error);
    });
  }
  
  
  // capturarFile(event) {
  //   const archivoCapturado = event.target.files[0];
  //  const estraer= this.extraerBase64(archivoCapturado).then((imagen:any) =>{
  //   this.previsualizacion =imagen.base;
  //    const url_pura= imagen.base.split(',')[1]
  //   console.log(imagen.base.split(',')[1]);

  //   this._iaimage.postIaImage(url_pura).subscribe({
  //     next:(v) => {
  //       this.toastr.success('Imagen Permitida no es oxena');

  //     },
  //     error: (e: HttpErrorResponse) => {
  //       if (e) {
  //         this._messageService.msgError(e);
  //       } else {
  //         console.error('no permite ese tipo de imagenes');
  //       }
  //     },      

  //   });
  //   })

   
  //   // console.log(event.target.files);
  //   // this.archivos.push(archivoCapturado);
  // }

  // extraerBase64 = async ($event: any) =>
  //   new Promise((resolve, reject) => {
  //     try {
  //       const unsafeImg = window.URL.createObjectURL($event);
  //       const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
  //       const reader = new FileReader();
  //       reader.readAsDataURL($event);
  //       reader.onload = () => {
  //         resolve({
  //           base: reader.result,
  //         });
  //         reader.onerror = (error) => {
  //           resolve({
  //             // blob:$event,
  //             // image,
  //             base: null,
  //           });
  //         };
  //       };
  //     } catch (error) {
  //       return null;
  //     }
  //   });

  // extraerBase64 = async ($event: any) => {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const reader = new FileReader();
  //       reader.readAsDataURL($event);
  //       reader.onload = () => {
  //         const base64 = reader.result?.toString() || '';
  //         const cleanBase64 = base64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
  //         resolve({
  //           base: cleanBase64,
  //         });
  //       };
  //       reader.onerror = (error) => {
  //         resolve({
  //           base: null,
  //         });
  //       };
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // };
  extraerBase64 = async ($event: any) =>
  new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result,
        });
      };
      reader.onerror = (error) => {
        resolve({
          base: null,
        });
      };
    } catch (error) {
      reject(error);
    }
  });

  
}
