import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployerService } from '../employer.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { format } from 'url';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.scss']
})
export class ManageJobsComponent implements OnInit {
  companyProfile: any;
  userId: string;
  jobs: any;
  status: string;

  constructor(private auth: AuthService ,
              private employerService: EmployerService,
              private router: Router) { }

  ngOnInit() {
    this.getUserProfile();
  }
  getUserProfile() {
    this.userId = this.auth.getUserId();
    console.log(this.userId);
    this.auth.getUserById(this.userId).subscribe((company) => {
    this.jobs = company.postedJobs;
    const date = new Date().toJSON().split("T")[0]; //Date now
    if (this.jobs.filter(x => x.expDate.split("T")[0] > date)){
       this.status = 'open';
    } else {
      this.status = 'expired';
    }
    });
    }
    TimeFromNow(time) {
      return moment(time).fromNow();
    }
    deleteJob(jobId) {
      this.employerService.deleteJob(jobId).subscribe((job) => {
        window.location.reload();
      });
    }
    // editJob(jobId) {
    //   this.employerService.editJob(jobId).subscribe((job) => {
    //     this.router.navigate([`/dashboard/employer/edit-job/${jobId}`]);
    //   });
    // }
    getCandidate(jobId) {
      this.router.navigate([`/dashboard/employer/manage-candidates/${jobId}`]);
    }
}
