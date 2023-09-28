import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    if (!form.valid) {
      return;
    }
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },
      errorMessage => {
        // console.log(errorMessage);
        this.errorMessage = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.errorMessage = null;
  }

  private showErrorAlert(message: string) {
    const alertCmp = new AlertComponent(); // Instanciranje komponente
    alertCmp.message = message; // Postavljanje poruke  
  }

}
