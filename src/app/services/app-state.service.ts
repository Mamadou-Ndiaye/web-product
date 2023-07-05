import { Injectable } from '@angular/core';
import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

    productState : any = {
    products : [],
    keyword: "",
    size: 3,
    currentPage: 1,
    totalPages: 0,
      status:"ERROR",
      errorMessage:""
   }

  constructor() { }

  setProductState(state :any): void{
     this.productState = { ...this.productState , ...state}
  }
}
