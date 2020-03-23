import { Component, OnInit } from '@angular/core';
import { EmployeeSidebarComponent } from 'src/app/common/employee-sidebar/employee-sidebar.component';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss'],
})
export class AppliedJobsComponent implements OnInit {
  userId: any;
  userJobs: any;

  constructor(
    private employeeService: EmployeeService ,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    this.getUserProfile();
  }
  getUserProfile() {
    this.userId = this.auth.getUserId();
    console.log(this.userId);
    this.auth.getUserById(this.userId).subscribe((user) => {
    this.userJobs = user.applayforJobs;
    });
  }
  getJob(jobId) {
    setTimeout(() => {
      window.location.href = `/job/job-detail/${jobId}`;
     }, 1000);
   }
   deleteJob(jobId) {
    this.employeeService.deleteApplayJob(jobId).subscribe((data) => {
  });
    setTimeout(() => {
    window.location.reload();
   }, 1000);
}

}
