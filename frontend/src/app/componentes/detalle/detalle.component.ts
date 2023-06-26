import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productosDisponibles } from 'src/app/models/productos';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  producto = productosDisponibles;

  nomProducto: string;
  detalle: any;

  constructor(private routeActivate: ActivatedRoute) {}

  generatePDF(nombre: string, precio: number, categoria: string) {
    window.alert('Compra exitosa');

    const documentDefinition = {
      content: [
        { text: 'mitiendapp', style: 'header' },
        { text: 'Gracias por su compra', style: 'subheader' },

        { text: JSON.stringify(nombre)},
        { text: JSON.stringify(precio) },
        { text: JSON.stringify(categoria)},
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
    this.nomProducto = this.routeActivate.snapshot.params['nombre'];

    // console.log(this.nomProducto)

    this.producto.forEach((producto) => {
      this.detalle = producto;
      // console.log(this.detalle);
    });
  }
}
