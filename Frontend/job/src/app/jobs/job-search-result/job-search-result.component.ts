import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-search-result',
  templateUrl: './job-search-result.component.html',
  styleUrls: ['./job-search-result.component.scss']
})
export class JobSearchResultComponent implements OnInit {
  keyword: any;
  location: any;
  type: any;
  jobs: any;
  errors: any;
  allJobs: boolean = false;
  alert: string;
  savedJob: boolean;

  constructor(public roter: Router ,
              private route: ActivatedRoute ,
              private router: Router,
              private jobService: JobService) { }

  ngOnInit() {
    this.route.params.subscribe(
  		(params) => {
  	     this.keyword = params['keywordSearch'];
         this.location = params['locationSearch'];
  			this.getSearchJobs();
  	});
  }
  getSearchJobs() {
    this.jobService.getJobsSearch(this.keyword , this.location).subscribe(
      (jobs) => {
        this.jobs = jobs;
      },
      (errorResponse: any) => {
        this.errors = errorResponse.error.errors;
      });
  }
  search(locationSearch: string, keywordSearch: string){
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
}
