import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product";
import {ProductComponent} from "../product/product.component";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent  implements OnInit{

  productId!: number;
  productForm!: FormGroup;
  product!: Product;

  constructor(private fb: FormBuilder, private  activatedRoute: ActivatedRoute, private productService: ProductService) {
    this.productId = this.activatedRoute.snapshot.params["id"];
  }
  ngOnInit(): void {

     //this.product = this.findProductById(this.productId);
    this.productService.findProductById(this.productId).subscribe({
      next : (product) => {
        this.product=product;
        console.log(this.product)
        this.productForm = this.fb.group({
          id:this.fb.control(this.productId),
        name:this.fb.control(this.product.name, [Validators.required]),
        price:this.fb.control(this.product.price,[Validators.min(100)]),
        checked:this.fb.control(this.product.checked)

      })},
      error : err => { console.log(err)}
    })
  }

  editProduct() {
    let productEdit :Product= this.productForm.value;
    console.log(JSON.stringify(productEdit))
    this.productService.updateProduct(productEdit).subscribe({
      next: data=>alert(JSON.stringify(data)),
      error: err => console.log(err)
    })

  }

  findProductById(id: number) : Product {
   let product:Product;
     this.productService.findProductById(id).subscribe({
      next : data => {product =data;},
      error : err => { console.log(err)}
    })
    // @ts-ignore
    return product;
  }
}
