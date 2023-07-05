import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

  productForm!: FormGroup
  constructor(private fb: FormBuilder, private productService: ProductService, private  router: Router) {
  }
  ngOnInit(): void {
    this.productForm= this.fb.group({
      name:this.fb.control(''),
      price:this.fb.control(''),
      checked:this.fb.control(false)
    })
  }

  saveProduct() {
    let product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({
      next : product => { this.router.navigateByUrl('/product')},
      error : err => console.log(err)
    })
  }
}
