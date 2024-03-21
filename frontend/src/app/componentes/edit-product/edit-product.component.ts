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
import { FiltroProductosService } from '../../services/FiltroProductos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {
  form: FormGroup;
  public previsualizacion: string;
  product: Product;
  filteredProducts: Product[] = [];
  public archivos: any = [];
  imageFile: any;
  imagePreview: any;
  isValidImage: boolean = true;
  private url_image_ia: string;
  imageUrl: string;


  constructor(

    private formBuilder: FormBuilder,
    private _filtroProductosService: FiltroProductosService,
    private headerService: HeaderService,
    private toastr: ToastrService,
    private _messageService: MessageService,
    private _productService: ProductService,
    private sanitizer: DomSanitizer,
    private _iaimage: IaImageServicesService,
    private spinner: NgxSpinnerService,
    private routeActivate: ActivatedRoute
  ) {

    this.url_image_ia = enviroment.url_image_ia;
  }

  openSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000)
  }

  ngOnInit(): void {
    this._productService.myProduct().subscribe(product => {
      this.product = product;
    })
    setTimeout(() => {

      // this.previsualizacion= this.product.image
    }, 500);
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      stock: ['', Validators.required],
      category: ['', Validators.required],

    });
    this.imageUrl = 'URL de la imagen';
    //de esta forma se captura el id en la url
    let idProduct = this.routeActivate.snapshot.params['id'];
    console.log(this.product)
  }


  //  analizarImagen(imageObject) {
  //     this._iaimage.postIaImage(imageObject).subscribe({
  //       next: (v) => {
  //         if (v.result === " No") { // Verifica si la respuesta indica que la imagen no es oxena
  //           this.toastr.success('Imagen permitida');
  //           console.log(v.result);

  //         } else  {
  //           this.toastr.error('Imagen no permitida'); // Muestra un mensaje de error si la imagen es oxena
  //           console.log(v.result);
  //         }
  //       },
  //       error: (e: HttpErrorResponse) => {
  //         if (e && e.error) { 
  //           this._messageService.msgError(e.error); 
  //         } else {
  //           console.error('Error desconocido al intentar procesar la imagen');
  //         }
  //       },
  //     });
  //   }



  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    if (this.imageFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.image = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
      this.isValidImage = true;
    } else {
      this.isValidImage = false;
    }
  }


  onUpdatePorduct() {
    const productId = this.routeActivate.snapshot.params['id'];
    console.log(productId)
    const formData = new FormData();
    formData.append('image', this.imageFile);
    formData.append('id', productId);
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    formData.append('price', this.form.value.price);
    formData.append('stock', this.form.value.stock);
    formData.append('category', this.form.value.category);
    console.log(formData)
    this._productService.updateProduct(formData).subscribe(
      () => {
        this.toastr.success('Producto actualizado exitosamente');
      },
      (error: HttpErrorResponse) => {
        this._messageService.msgError(error);
      }
    );

  }
}