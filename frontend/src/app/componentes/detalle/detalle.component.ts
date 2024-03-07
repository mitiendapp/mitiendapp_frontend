import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { PaymentService } from 'src/app/services/payment.service';
import { BehaviorSubject } from 'rxjs';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  detail:any;
  idProduct: number = 0;

  constructor(private routeActivate: ActivatedRoute,
    private _productService: ProductService,
    private _paymentService: PaymentService,
    private route: ActivatedRoute, private router: Router) {}

  generatePDF(nombre: string, precio: number) {
    window.alert('Compra exitosa');

    const documentDefinition = {
      content: [
        { text: 'mitiendapp', style: 'header' },
        { text: 'Gracias por su compra', style: 'subheader' },

        { text: JSON.stringify(nombre)},
        { text: JSON.stringify(precio) },
        // { text: JSON.stringify(categoria)},
      ],
    
    };

    pdfMake.createPdf(documentDefinition).download('mi-archivo.pdf');

    // pdfMake.getBase64((data) => {

    //   const transporter = nodemailer.createTransport({

    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth:{

    //     }
    //   })

    // })
  }

  ngOnInit(): void {
    this.idProduct = this.routeActivate.snapshot.params["id"];
    this.getProduct(this.idProduct);
  }
  getProduct(id:number) {
    this._productService.getProductById(id).subscribe((data: any) => {
      this.detail = data.data;
    })
  }

  // createOrder(){
  //   this._paymentService.createOrder(this.detail).subscribe((data:any)=>{
  //     console.log(data);
  //     window.location.href = data.init_point
  //   })
  // }
  createOrder(){
    this._paymentService.createOrder(); 
  }

}
