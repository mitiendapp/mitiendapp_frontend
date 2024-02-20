import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { Observable,BehaviorSubject, lastValueFrom} from 'rxjs';
import { Product } from '../interfaces/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private endpoint:string;
  private apiUrl:string;
    //lista carrito
    private myList: Product[] = [];

    //carrito observable
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();
  
  constructor(private http:HttpClient) {
    this.endpoint= enviroment.endpoint;
    this.apiUrl= 'cart';
   }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.endpoint}${this.apiUrl}/get`);
  }

  create(product:Product):Observable<any>{
    return this.http.post(`${this.endpoint}${this.apiUrl}/add`, product)
  }

  
  //añado producto al carrito
  addProduct(product: Product) {

    // debugger;
    if (this.myList.length === 0) {
      product.stock = 1;
      this.myList.push(product);
      //emito la lista para los que estén escuchando
      this.myCart.next(this.myList);

    } else {
      const productMod = this.myList.find((element) => {
        return element.id === product.id
      })
      if (productMod) {
        productMod.stock = productMod.stock + 1;
        this.myCart.next(this.myList);
      } else {
        product.stock = 1;
        this.myList.push(product);
        //ojo hay que emitir la lista!!
        this.myCart.next(this.myList);
      }

    }
  }
    

  findProductById(id:number) {
    return this.myList.find((element:any) => {
      return element.id = id
    })

  }

  deleteProduct(id: number) {

    this.myList = this.myList.filter((product:any) => {
      return product.id != id
    })
    this.myCart.next(this.myList);
  }

  totalCart() {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.stock * product.price); }, 0)
    return total
  }
}
