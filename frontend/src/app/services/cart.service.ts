import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { Observable,BehaviorSubject, lastValueFrom} from 'rxjs';
import { Product } from '../interfaces/product';
import { map } from 'rxjs/operators';

export interface ProductDTO extends Product{
  quantity: number
}
type both = ProductDTO | Product;
@Injectable({
  providedIn: 'root'
})
export class CartService{
  private endpoint:string;
  private apiUrl:string;
  public itemAdd = new BehaviorSubject<Boolean>(false);
  
  //lista carrito
  private myList: ProductDTO[] = [];
  
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
  
  productToProductDTO(product){
    return {...product,
    quantiy:1}
  }

  //añado producto al carrito
  addProduct(product: ProductDTO) {
    
    // debugger;
    if (this.myList.length === 0) {
      product.quantity = 1;
      this.myList.push(product);
      //emito la lista para los que estén escuchando
      this.myCart.next(this.myList);
      
    } else {
      const productMod = this.myList.find((element) => {
        return element.id === product.id
      })
      if (productMod) {
        productMod.quantity = productMod.quantity + 1;
        this.myCart.next(this.myList);
      } else {
        product.quantity = 1;
        this.myList.push(product);
        //ojo hay que emitir la lista!!
        this.myCart.next(this.myList);
      }
      
    }
    this.itemAdd.next(true);
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
    const total = this.myList.reduce(function (acc, product) { return acc + (product.quantity * product.price); }, 0)
    return total
  }
  
  public itemAdded(){
    return this.itemAdd.asObservable();
  }
}
