import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private  appState: AppStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.appState.setProductState({
      status:"LOADING"
    });
    console.log(this.appState.productState.status)
    let req= request.clone({
      headers: request.headers.set("Authorization","Bearer JWT")
    });
    return next.handle(req).pipe(
      finalize(()=>{
        this.appState.setProductState({
          status: ""
        });
      })
    );
  }
}
