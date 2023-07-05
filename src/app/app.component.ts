import { Component } from '@angular/core';
import {AppStateService} from "./services/app-state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  actions : Array<any> = [
    {title :"Home",path: "/home", icon : "home"},
    {title :"Product",path: "/product", icon : "search"},
    {title :"New-Product",path: "/new-product", icon : "save"}
   ]
   currentAction: any;

  constructor(public appState:AppStateService) {
  }

  setCurrentAction(action: any) {
    this.currentAction= action;
  }
}
