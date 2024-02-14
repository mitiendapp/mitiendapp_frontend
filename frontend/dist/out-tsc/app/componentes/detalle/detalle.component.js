import { __decorate } from "tslib";
import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { BehaviorSubject } from 'rxjs';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;
let DetalleComponent = class DetalleComponent {
    constructor(routeActivate, _productService, _paymentService, route, router) {
        this.routeActivate = routeActivate;
        this._productService = _productService;
        this._paymentService = _paymentService;
        this.route = route;
        this.router = router;
        this.idProduct = 0;
        this.loaded = new BehaviorSubject(false);
    }
    generatePDF(nombre, precio) {
        window.alert('Compra exitosa');
        const documentDefinition = {
            content: [
                { text: 'mitiendapp', style: 'header' },
                { text: 'Gracias por su compra', style: 'subheader' },
                { text: JSON.stringify(nombre) },
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
    ngOnInit() {
        this.idProduct = this.routeActivate.snapshot.params["id"];
        this.getProduct(this.idProduct);
    }
    getProduct(id) {
        this._productService.getProductById(id).subscribe((data) => {
            this.detail = data.data;
            // console.log("HERE");
            console.log(data.data);
            this.loaded.next(true);
        });
    }
    createOrder() {
        this._paymentService.createOrder().subscribe((data) => {
            console.log(data);
            window.location.href = data.init_point;
        });
    }
    isLoaded() {
        return this.loaded.asObservable();
    }
};
DetalleComponent = __decorate([
    Component({
        selector: 'app-detalle',
        templateUrl: './detalle.component.html',
        styleUrls: ['./detalle.component.css'],
    })
], DetalleComponent);
export { DetalleComponent };
//# sourceMappingURL=detalle.component.js.map