import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  implements  OnInit{


/*
  products : Array<Product> = [

  ];
  keyword!: string;

  size: number = 3;
  currentPage: number = 1;
  totalPages!: number;
*/

  constructor(private  productService: ProductService, private  router: Router, public  appState : AppStateService) {
  }

  ngOnInit(): void {
    this.searchProduct();
  }

  searchProduct(){
    /*this.appState.setProductState({
     status:"LOADING"
    })*/
    this.productService.searchProducts(this.appState.productState.keyword, this.appState.productState.currentPage , this.appState.productState.size).subscribe({
      next : response => {
            let products = response.body;
             let totalCount : number =  parseInt(response.headers.get('X-Total-Count')!)
             let totalPages : number =Math.floor( totalCount/this.appState.productState.size);
           if(totalCount % this.appState.productState.size !=0) this.appState.setProductState({totalPages:++this.appState.productState.totalPages  })

            this.appState.setProductState({
              products: products,
              totalCount : totalCount,
              totalPages : totalPages,
              status:"LOAD",
            })
        },
      error : err =>{
        this.appState.setProductState({
        status:"ERROR",
          errorMessage:err
      })}
    })
  }

  handleCheckProduct(product: Product) : void {
      this.productService.checkedProduct(product).subscribe({
        next :  data =>  product.checked =! product.checked,
        error : err => console.log(err)
      })
      //product.checked =!product.checked;
  }

  handleDeleteProduct(product: Product) : void {
    if (confirm('Etes vous sure ? '))
    this.productService.deleteProduct(product).subscribe({
      next : data=> this.appState.productState.products = this.appState.productState.products.filter((p:any) => p.id != product.id),
      error : err => console.log(err)
    })
    //product.checked =!product.checked;
  }

 /* handleSearchProduct() {
    this.currentPage = 1;
    this.totalPages = 0;

    this.productService.searchProducts(this.keyword, this.currentPage, this.size).subscribe({
      next : data => this.products =data,
      error : err => console.log(err)
    })
  }*/

  goToPage(page: number) {
    this.appState.productState.currentPage = page;
    this.searchProduct();

  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/edit-product/${product.id}`);
  }
}
