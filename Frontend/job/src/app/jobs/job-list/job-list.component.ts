import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs =  [];
  p:string;
  objectA:any;
  objectB:any;
  alert: string;
  savedJob: boolean;
  user:string;
  userId:any;
  jobId: any;
  id: any;

  constructor(private jobService: JobService , private router:Router , private auth: AuthService) { }
  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.auth.getUserById(this.userId).subscribe((user) => {
    this.user = user;
    });
    this.jobService.jobList().subscribe((data) => {
      this.jobs = data;
      console.log(this.jobs);
    });
  }

  search(locationSearch: string, keywordSearch: string) {
   this.router.navigate([`/jobs/${locationSearch}/${keywordSearch}/homes`]);
   }
   sendNotificationEmail(location: string , keyword: string) {
      this.jobService.sendNotificationEmail(location, keyword).subscribe((data) => {
      });
      this.alert = 'Your alert for ' + keyword + ' job is saved successfuly';
      this.savedJob = true;
      setTimeout(() => {
          this.savedJob = false;
        }, 5000);
   }
   getJob(job) {
     this.id = job._id;
     this.router.navigate([`/job/job-detail/${this.id}`]);
   }


}
