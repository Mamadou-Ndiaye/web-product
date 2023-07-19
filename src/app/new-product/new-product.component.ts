import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
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
      name:this.fb.control('',[Validators.required,Validators.minLength(4)]),
      price:this.fb.control(0,[Validators.min(100)]),
      checked:this.fb.control(false),
      promo:this.fb.control(false)
    })
  }

  saveProduct() {
    let product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({
      next : product => { this.router.navigateByUrl('/admin/product')},
      error : err => console.log(err)
    })
  }

  getErrorMessage(fieldName: string, errors: ValidationErrors ) {
    if(errors['required']){
      return fieldName + " is required"
    }
    else if(errors['minlength']){
      return fieldName + " should have at least " + errors['minlength']['requiredLength'] + " Characters";
    }
    else if(errors['minlength']){
      return fieldName + " should have min value " + errors['min']['min'] ;
    }
    else return "";

  }
}
