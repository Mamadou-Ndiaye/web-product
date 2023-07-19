import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {AppStateService} from "../services/app-state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements  OnInit{

  loginForm! : FormGroup;
  errorMessage: any;

  constructor(private  fb : FormBuilder, private  authService: AuthenticationService, public appState: AppStateService, private  router: Router) {
  }
  ngOnInit(): void {

    this.loginForm = this.fb.group({
        username : this.fb.control(""),
        password : this.fb.control(""),
    })
  }

  handleLogin() {
    let username= this.loginForm.value.username;
    let password= this.loginForm.value.password;
    this.authService.login(username,password).then(resp=>
      {
        this.router.navigateByUrl('/admin')
      }

    ).catch(err=>{
       this.errorMessage = err
    })

  }
}
