
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployerService } from '../employer.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-bookmarks',
  templateUrl: './manage-bookmarks.component.html',
  styleUrls: ['./manage-bookmarks.component.scss']
})
export class ManageBookmarksComponent implements OnInit {
  [x: string]: any;
  userId: any;
  bookmark: boolean = false;
  companyId: any;
  companiesBookmarks = [];
  usersBookmarks = [];

  constructor(private auth: AuthService ,
              private employerService: EmployerService,
              private router: Router) { }

  ngOnInit() {
    this.getUserProfile();
  }
  getUserProfile() {
    this.userId = this.auth.getUserId();
    this.auth.getUserById(this.userId).subscribe((company) => {
    this.usersBookmarks = company.bookmarkUsers;
    this.companiesBookmarks = company.bookmarkCompanies;
     });
    }
    getEmployee(userId) {
       setTimeout(() => {
         window.location.href = `/employee/user-profile/${this.userId}`;
         }, 1000);
    }
    deleteBookmark(employeeId) {
      this.employerService.deleteBookmarkEmployee(this.userId, employeeId).subscribe((data) => {
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
   }

}


