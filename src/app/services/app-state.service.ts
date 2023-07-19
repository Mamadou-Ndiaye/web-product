import { Injectable } from '@angular/core';
import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

   public productState : any = {
    products : [],
    keyword: "",
    size: 3,
    currentPage: 0,
    totalPages: 0,
      status:"ERROR",
      errorMessage:""
   }

   authState : any = {isAuthenticated : false,
     username : "",
     roles : [],
     token : "",
     status : "" ,
     errorMessage : "",
     openapiKey :"YOUR API KEY"


   }

  constructor() { }

  setProductState(state :any): void{
     this.productState = { ...this.productState , ...state}
  }

  setAuthState(state :any): void{
    this.authState = { ...this.authState , ...state}
  }
}
