import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../job.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Upload } from 'src/app/common/models/upload.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { BsDatepickerConfig , BsModalRef } from 'ngx-bootstrap';
import { FileUploader} from 'ng2-file-upload';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/employee/employee.service';
import { filter } from 'rxjs/operators';
const URL = 'http://localhost:3001/api/v1/image/upload-image';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  fileUploadProgress: string = null;
  // image Requirements
  uploader: FileUploader = new FileUploader ({
    url: URL,
    disableMultipart: true
  });
  jobId: string;
  job: any;
  errors: any;
  userId: string;
  user: any;
  successAlert: string;
  success: boolean;
  applayJob: FormGroup;
  selectedFile: any;
  selectedPdf: any;
  pdfUploadProgress: string;
  countries: any;
  jobApplicants = [];
  canApplay: boolean = true;
  similarJobs :boolean = false;
  FindSimilarJobsArr: any;
  Alljobs: any;
  id: any;
  jobOwner: any;
  companyProfile: any;
  comapny: any;

  constructor(private jobService: JobService ,
              private router: Router ,
              private auth: AuthService ,
              private route: ActivatedRoute,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private http: HttpClient,
              private employeeService: EmployeeService,
              ) { }

  ngOnInit() {
    this.getCountries();
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.jobService.getJob(this.jobId).subscribe((data) => {
      this.job = data;
      this.jobOwner = data.jobOwner;
      this.auth.getUserById(this.jobOwner).subscribe((company) => {
        this.comapny = company;
        this.companyProfile = company.profile;
        console.log('mmm', this.companyProfile);
        console.log('mmkkkkm', this.jobOwner);
      });
      this.FindSimilarJobs(this.job.title , this.jobId);
      this.jobApplicants = data.jobApplicants;
      const jobApplicants = this.jobApplicants.filter(item => {
        for (let key in filter) {
          if (item[key] === undefined || item[key] !== filter[key]) {
            return false;
          }
        }
        return true;
      });
      const applicantsaId = jobApplicants
    .map(item => ({ 
        userId: item.userId, 
    }));
      const ar = [];
      const Id = applicantsaId.map(({ userId }) => this.userId);
      if (this.userId in Id){
        this.canApplay = false;
      }
     } , (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
    });
    this.jobService.jobList().subscribe((data) => {
      this.Alljobs = data;
    });
    this.userId = this.auth.getUserId();
    if (this.userId) {
    this.auth.getUserById(this.userId).subscribe((user) => {
    this.user = user;
     });
    } else {
     this.user = '';
    }
    this.applayJob = this.fb.group ({
      name: ['',  [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['', [Validators.required , Validators.email]],
      phoneCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      pdf: ['', Validators.required]
    });

     }
     TimeFromNow(time) {
      return moment(time).fromNow();
    }
    userApplayForJob() {
      this.jobService.userApplayForJob(this.jobId, this.user).subscribe((data) => {
    });
      window.scroll(0, 0); // scroll to top of page;
      this.successAlert = 'You applied to' + ' ' + this.job.title + ' ' + 'job successfully';
      this.success = true;
      setTimeout(() => {
      this.success = false;
      window.location.href = '/job-list';
     }, 10000);
  }

  // if anounce applay for job 
    // Get all countries
    getCountries() {
      this.employeeService.getCountries().subscribe((countries) => {
       this.countries = countries;
       });
     }
   

  // cv upload 

  ReadAsBase64(file): Promise <any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });

      reader.addEventListener('error', (event) => {
        reject(event);
      });
      reader.readAsDataURL(file);
    });
    return fileValue;
  }
OnPdfSelect(event) {
  console.log(event);
  const pdfFile: File = event[0];
  const pdfSize = pdfFile.size;
  console.log('pdfSize', pdfFile);
  if (pdfSize > 1699999) {
    alert('File is too big!');
    const filePdf = '';
    this.ReadAsBase64(filePdf).then(result => {
    this.selectedFile = result;
   }).catch (err => console.log(err));
} else {
   this.ReadAsBase64(pdfFile).then(result => {
     this.selectedPdf = result;
     console.log('selectedPdf', this.selectedPdf);
   }).catch (err => console.log(err));
 }
 }


submit(applayJob) {
  this.pdfUploadProgress = '0%';
  this.jobService.sendApplayJob(this.selectedPdf , applayJob.value , this.jobId)
  .subscribe(events => {
    if(events.type === HttpEventType.UploadProgress) {
      this.pdfUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
      console.log(this.pdfUploadProgress);
    } else if(events.type === HttpEventType.Response) {
      this.pdfUploadProgress = '';
      alert('SUCCESS !!');
    };
  });
}

FindSimilarJobs(jobName , jobId) {
  console.log('jobId', jobId);
  const key = jobName;
  this.jobService.getSimilarJobs(key).subscribe((data) => {
   if (data) {
    this.similarJobs = true;
    const arr = this.FindSimilarJobs = data;
    this.FindSimilarJobsArr = arr.filter(x => x._id !== jobId);
   } else {
    this.similarJobs = false;
   }
  });
}
getJob(smilarJob) {
  this.id = smilarJob._id;
  setTimeout(() => {
    this.success = false;
    window.location.href = `/job-detail/${this.id}`;
   }, 1000);
 }
 getCompany() {
  setTimeout(() => {
    this.success = false;
    window.location.href = `/view-company-profile/${this.jobOwner}`;
   }, 1000);
 }
}
