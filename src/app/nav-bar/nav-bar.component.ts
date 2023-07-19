import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoaderService} from "../services/loader.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  actions : Array<any> = [
    {title :"Home",path: "/home", icon : "home"},
    {title :"Product",path: "/admin/product", icon : "search"},
    {title :"New-Product",path: "/admin/new-product", icon : "save"}
  ]
  currentAction: any;

  constructor(public appState:AppStateService, public loaderService: LoaderService, public router: Router) {
  }

  setCurrentAction(action: any) {
    this.currentAction= action;
  }

  logout() {
    this.appState.authState={};
    this.router.navigateByUrl('/login');

  }

  login() {
    this.router.navigateByUrl('/login');

  }
}
