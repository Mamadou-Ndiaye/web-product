import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './new-product/new-product.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

const routes: Routes = [
  {path:"home", component : HomeComponent},
  {path:"", component : HomeComponent},
  {path:"product", component : ProductComponent},
  {path:"new-product", component : NewProductComponent},
  {path:"edit-product/:id", component : EditProductComponent},
  {path:"**", component : PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
