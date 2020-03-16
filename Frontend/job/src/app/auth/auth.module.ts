import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import 'hammerjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// for route
import { Routes, RouterModule } from '@angular/router';


import { AuthComponent } from '../auth/auth.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { VerifyComponent } from '../auth/verify/verify.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptor } from './shared/token.interceptor';
import { ConfirmEqualValidatorDirective } from './confirm.equal.validator.directive';
import { DeactivateGuard } from './shared/deactive.guard';


const routes: Routes = [

]

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    ConfirmEqualValidatorDirective,
  ],
  imports: [
    RouterModule.forRoot(routes),  // for route
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [  AuthService, AuthGuard , DeactivateGuard, {
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}, //send token to header
    ],
})
export class AuthModule { }
