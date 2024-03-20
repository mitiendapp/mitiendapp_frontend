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
import { NgxSpinnerService } from 'ngx-spinner';
import {FiltroProductosService } from '../../services/FiltroProductos.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {
  form: FormGroup;
  public  previsualizacion :string;
  listProducts: Product[] = [];
  filteredProducts: Product[] = [];
  public archivos: any = [];
  imageFile: any;
  imagePreview: any;
  isValidImage: boolean = true;
  private url_image_ia:string;
  

  constructor(
    private formBuilder: FormBuilder,
    private _filtroProductosService: FiltroProductosService,
    private headerService: HeaderService,
    private toastr: ToastrService,
    private _messageService: MessageService,
    private _productService: ProductService,
    private sanitizer: DomSanitizer,
    private _iaimage:IaImageServicesService,
    private spinner : NgxSpinnerService
  ) {

    this.url_image_ia= enviroment.url_image_ia;
  }

  openSpinner(){
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },3000)
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      stock: ['', Validators.required],
      category: ['', Validators.required],

    });
  }

  //pasos para editar el producto ------------------------------------------------------------

  filtrarProductos(terminoBusqueda: string): void {
    if (terminoBusqueda.trim() !== '') {
      this.filteredProducts = this.listProducts.filter(producto =>
        producto.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.listProducts]; // Restaurar la lista completa de productos si el filtro está vacío
    }
  }

  getProductsIdCompany(companyId:string){
    console.log("hola desde editar")
    this._productService.getProductId(companyId).subscribe((data:any)=>{
      const dataProducts=data.data
      if (Array.isArray(dataProducts)) {
        this.listProducts = dataProducts; // Si es un arreglo, asignar directamente
        console.log(this.listProducts, 'adentro')
      } else {
        this.listProducts = [dataProducts]; // Si es un objeto, envolverlo en un arreglo
        console.log(this.listProducts, 'dentro else')
      }
      console.log(this.listProducts, 'afuera')
    })
  
  }
//Aqui agrego lo de traer informacion de un solo producto

  onCreateProduct() {
    const { name, description, price, stock, category } = this.form.value;
    // const imageFile = this.form.get('image').value;
  
  
    // if (!this.form.valid || !imageFile) {
    //   this.toastr.error('Todos los campos son obligatorios', 'Error');
    //   return;
    // }

  
    const product: Product = {
      name: name,
      description: description,
      price: price,
      image: '', // Dejar este campo vacío porque el archivo de imagen se enviará por FormData
      stock: stock,
      category: category
    };
  
    const formData = new FormData();
     formData.append('image', this.imageFile);
  
    // Aquí puedes agregar otros campos del producto si es necesario
    formData.append('name', this.form.value.name);
    formData.append('description',this.form.value.description);
    formData.append('price', this.form.value.price);
    formData.append('stock', this.form.value.stock);
    formData.append('category', this.form.value.state);
    
  
    this._productService.create(formData).subscribe({
      next: (v) => {
        this.toastr.success('Producto cargado exitosamente');
      },
      error: (e: HttpErrorResponse) => {
        if (e) {
          this._messageService.msgError(e);
        } else {
          console.error('Error desconocido al intentar cargar el producto');
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
          this.toastr.success('Imagen permitida');
          console.log(v.result);
          
        } else  {
          this.toastr.error('Imagen no permitida'); // Muestra un mensaje de error si la imagen es oxena
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

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    if (this.imageFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
      this.isValidImage = true;
    } else {
      this.isValidImage = false;
    }
//  console.log()
this.extraerBase64( this.imageFile).then((imagen: any) => {
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
  //   this.extraerBase64(archivoCapturado).then((imagen: any) => {
  //     this.previsualizacion = imagen.base;
  //     const url_pura = imagen.base.split(',')[1];
  //     console.log(imagen.base.split(',')[1]);
  
  //     const imageObject = {
  //       imagePath:url_pura // Aquí asignamos el contenido base64 como imagePath
  //     };
  //     this.analizarImagen(imageObject)


 
  //   }).catch((error) => {
  //     console.error('Error al extraer la base64 de la imagen:', error);
  //   });
  // }
  
  
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


  };



