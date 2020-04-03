import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
// import { TranslateService } from 'ng2-translate';
import {Subscription } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData  = {};
  errorMessage: string;
  successMessage: string;
  userId: any;
  constructor(
              // private translate: TranslateService,
              private as: AuthService ,
              private router: Router,
              private auth : AuthService,
              private activatedRoute: ActivatedRoute )
    {
    // translate.addLangs(['ar' , 'en']);
    // translate.setDefaultLang('ar');
    // const  browserlang = translate.getBrowserLang();
    // translate.use(browserlang.match(/ar|en/) ? browserlang : 'ar');

    }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        const email = param['email'];
        const token = param['token'];
        this.as.confirmEmail(email , token).subscribe((data) => {
          console.log(data);
        });
      });
  }

  login(formData) {
    this.as.signIn(formData.email , formData.password ).subscribe((data) => {
    console.log(data);
    this.getUserById();
    window.location.href =  '/';
    },
    (err) => {
      this.errorMessage = 'Email or password is not correct';
      console.log(err);
    });
}
    getUserById() {
      this.userId = this.as.getUserId();
      this.as.getUserById(this.userId).subscribe((user) => {
        console.log(user);
        if (user.isVerified) {
          this.router.navigate(['/']);
        }
        if(!user.isVerified) {
          this.router.navigate(['/verfiy']);
        }
      });
    }


}


