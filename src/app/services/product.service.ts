import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl : string = `http://localhost:8089`;

  constructor(private  http: HttpClient) { }


  searchProducts(keyword : string= "", page: number=1, size: number=3){
    return this.http.get<any>(this.baseUrl+"/products?name_like="+keyword+"&_page="+page+"&_limit="+size, {observe: "response"});
  }
  checkedProduct(product: Product) : Observable<Product>{
    return this.http.patch<Product>(this.baseUrl+"/products/" + product.id, {checked: product.checked});
  }

  setPromoProduct(product: Product) : Observable<Product>{
    return this.http.patch<Product>(this.baseUrl+"/products/" + product.id, {promo: product.promo});
  }
  deleteProduct(product: Product){
     return this.http.delete(this.baseUrl+"/products/" + product.id);
  }

  saveProduct(product: Product) : Observable<Product>{
    return this.http.post<Product>(this.baseUrl+"/products", product);
  }

  findProductById(id: number){
    return this.http.get<Product>(this.baseUrl+"/products?id="+id);
  }

 /* searchProducts(keyword: string, page: number, size: number){
    return this.http.get<Array<Product>>(this.baseUrl+"/products?name_like="+keyword+"&_page="+page+"&_limit="+size);
  }*/
  updateProduct(productEdit: Product) {
    return this.http.put<Product>(this.baseUrl+`/products/${productEdit.id}`,productEdit);
  }
}
