import { Injectable } from '@angular/core';
import {AppStateService} from "./app-state.service";
import {firstValueFrom, Observable} from "rxjs";
import jwtDecode from "jwt-decode";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl : string = `http://localhost:8089`;


  constructor(private  appState :AppStateService, private  http: HttpClient) { }

  async login(username :string, password : string){
      try {
              let  data : any = await firstValueFrom(this.http.get(`${this.baseUrl}/users/${username}`))
        console.log(data.password);
        console.log(data.username);
               console.log(password);
               console.log(atob(data.password));
               console.log(btoa(data.password));
              if(atob(data.password)===password){
                 let token =  data.token;
                 let decodeJWt: any = jwtDecode(token)
                this.appState.setAuthState({
                  token : token,
                  isAuthenticated : true,
                  username : username,
                  roles : decodeJWt.roles
                });
                 console.log(this.appState.authState);
                 return Promise.resolve(true);
              }
              else
                return  Promise.reject("Bad credential");

      }catch(e)
    {
           return  Promise.reject("Network error")
    }
  }


  public hasRole(role:string):boolean{

   return true;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  logout(){
    this.appState.setAuthState({
        isAuthenticated :false,
        username : "",
        token : ""
    })
    localStorage.removeItem('access_token')
  }
}
