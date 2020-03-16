import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userId: any;
  user: any;

  constructor(private auth: AuthService ,private router: Router ) {
   }

  ngOnInit() {
    this.getUserProfile();
  }
  getUserProfile() {
    this.userId = this.auth.getUserId();
    console.log(this.userId);
    this.auth.getUserById(this.userId).subscribe((user) => {
    this.user = user;
    console.log(user.role);
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
