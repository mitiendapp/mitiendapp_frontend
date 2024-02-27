import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { HeaderService } from 'src/app/services/header.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';
import { log } from 'console';
import { DomSanitizer } from '@angular/platform-browser';
import { resolve } from 'path';
import { rejects } from 'assert';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  form: FormGroup;
    public  previsualizacion :string;
  public archivos: any = [];


  constructor(
    private formBuilder: FormBuilder,
    private headerService: HeaderService,
    private toastr: ToastrService,
    private _messageService: MessageService,
    private _productService: ProductService,
    private sanitizer: DomSanitizer
  ) {}

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

  capturarFile(event) {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any) =>{
    this.previsualizacion =imagen.base;
    console.log(imagen.base);
    })
    console.log(event.target.files);
    this.archivos.push(archivoCapturado);
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
          reader.onerror = (error) => {
            resolve({
              // blob:$event,
              // image,
              base: null,
            });
          };
        };
      } catch (error) {
        return null;
      }
    });
}
