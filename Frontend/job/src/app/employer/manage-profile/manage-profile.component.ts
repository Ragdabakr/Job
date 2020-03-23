
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployerService } from '../employer.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  [x: string]: any;
  userId: any;
  companyProfile: any;
  openJobs: any;
  jobId: any;
  socialAccounts = [];
  bookmark:boolean = false;
  bookmarks: any;
  companyId: any;
  FindbookmarkedCompanies: any;
  pageUrl: string;

  constructor(private auth: AuthService ,
             private employerService: EmployerService,
             private router :Router) { }

  ngOnInit() {
    this.getUserProfile();
    this.findOpenJobs();
  }
  getUserProfile() {
    this.pageUrl = location.href;
    this.userId = this.auth.getUserId();
    console.log(this.userId);
    this.auth.getUserById(this.userId).subscribe((company) => {
    this.companyProfile = company.profile;
    this.socialAccounts = company.profile.socials;
    this.bookmarks = company.bookmarkCompanies;
    this.companyId = company._id;
    const arr = this.bookmarks;
    this.FindbookmarkedCompanies = arr.filter(x => x.company === this.userId);
    if (this.FindbookmarkedCompanies.length > 0 ) {
      this.bookmark = true;
    }
     });
    }
    findOpenJobs() {
     this.employerService.findOpenJobs(this.userId).subscribe((data) => {
       this.openJobs = data;
     });
    }
    getJob(jobId) {
     this.jobId = jobId;
     setTimeout(() => {
        window.location.href = `/job-detail/${this.jobId}`;
       }, 1000);
    }
    getAccount(accountLink) {
      setTimeout(() => {
         window.location.href = `${accountLink}`;
        }, 1000);
     }
     TimeFromNow(time) {
      return moment(time).fromNow();
    }
    bookmarkCompany() {
      const arr = this.bookmarks;
      this.FindbookmarkedCompanies = arr.filter(x => x.company === this.userId);
      if (this.FindbookmarkedCompanies.length > 0 ) {
        this.bookmark = true;
      } else {
          this.employerService.createCompanyBookmark(this.companyId).subscribe((data) => {
            this.bookmark = true;
      });
    }
  }
  editCompanyProfile() {
    // tslint:disable-next-line: no-debugger
    debugger;
    setTimeout(() => {
      window.location.href = `/dashboard/employer/edit-profile/${this.companyId}`;
    }, 1000);
  }

}

