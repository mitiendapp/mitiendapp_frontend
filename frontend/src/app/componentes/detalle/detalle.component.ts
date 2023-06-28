import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
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
      // styles: {
      //   header: { fontSize: 23, bold: true, margin: [0, 0, 0, 10] },
      //   subheader: { fontSize: 20, bold: true, margin: [0, 0, 0, 10] },
      //   body: { fontSize: 18 },
      // },
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
      console.log("HERE");
      
      console.log(data.data);
      
    })
  }
}
