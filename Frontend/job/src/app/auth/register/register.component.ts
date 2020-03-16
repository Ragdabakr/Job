import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  role = 'employee';
  formData = {};
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService , private router : Router) { }

  ngOnInit() {
    this.formData = {};
  }

  register(formData) {
    this.auth.SignUp(formData.email , formData.password , formData.role).subscribe(
      (result) => {
      console.log(result);
      this.successMessage = 'we send verification link to your email' + ''+formData.email;
    },
    (error) => {
      this.errorMessage = 'user already exist ';
    },
    () => {
      // 'onCompleted' callback.
      // No errors, route to new page here
    }
  );
}


}
