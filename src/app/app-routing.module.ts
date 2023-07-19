import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './new-product/new-product.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {LoginComponent} from "./login/login.component";
import {AdminTempleteComponent} from "./admin-templete/admin-templete.component";
import {authenticationGuard} from "./guards/authentication.guard";
import {authorizationGuard} from "./guards/authorization.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";

const routes: Routes = [
  {path:"home", component : HomeComponent},
  {path:"admin", component : AdminTempleteComponent, canActivate: [authenticationGuard] , children : [
      {path:"product", component : ProductComponent},
      {path:"new-product", component : NewProductComponent, canActivate: [authorizationGuard] },
      {path:"edit-product/:id", component : EditProductComponent , canActivate: [authorizationGuard]},
      {path:"notAuthorized", component : NotAuthorizedComponent},
    ]
  },
  {path:"login", component : LoginComponent},
  {path:"", redirectTo:"login", pathMatch: "full"},
  {path:"**", component : PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
