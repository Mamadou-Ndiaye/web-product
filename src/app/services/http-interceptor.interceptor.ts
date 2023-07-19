import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {LoaderService} from "./loader.service";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private  appState: AppStateService, private loaderService : LoaderService, private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   /* this.appState.setProductState({
      status:"LOADING"
    });*/
    this.loaderService.showLoading();
    console.log(this.authService.getToken());
   /* const token = this.authService.getToken();
    this.appState.setAuthState({
      token : token
    })
*/
    let req= request.clone({
      headers: request.headers.set("Authorization","Bearer JWT" )
    });
    return next.handle(req).pipe(
      finalize(()=>{
      /*  this.appState.setProductState({
          status: ""
        });*/
        this.loaderService.hideLoading();
      })
    );
  }
}
