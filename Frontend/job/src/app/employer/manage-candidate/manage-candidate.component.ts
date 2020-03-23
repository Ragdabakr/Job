import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerService } from '../employer.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { JobService } from 'src/app/jobs/job.service';
import { EmployeeService } from 'src/app/employee/employee.service';

@Component({
  selector: 'app-manage-candidate',
  templateUrl: './manage-candidate.component.html',
  styleUrls: ['./manage-candidate.component.scss']
})
export class ManageCandidateComponent implements OnInit {
  jobId: any;
  job: any;
  jobApplicants: any;
  applayUser: any;
  pdfVersion: any;
  pdfId: any;
  user: any;
  profileData: any;
  messageForm: any;
  selectedFile: any;
  selectedPdf: any;
  pdfUploadProgress: string;
  userId: string;

  constructor( private employerService: EmployerService ,
               private jobService: JobService ,
               private route: ActivatedRoute,
               private fb: FormBuilder,
               private auth: AuthService,
               private http: HttpClient,
               private employeeService : EmployeeService,
               private router: Router) { }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.jobId = this.route.snapshot.paramMap.get('jobId');
    this.jobService.getJob(this.jobId).subscribe((data) => {
      this.job = data;
      this.jobApplicants = data.jobApplicants;
      this.applayUser = data.jobApplicants.userId;
    });
    this.messageForm = this.fb.group ({
      name : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['', [Validators.required , Validators.email]],
      message: ['', Validators.required],
      attachments: ['']
    });
  }
  downloadPdf(userId) {
    this.auth.getUserById(userId).subscribe((user) => {
      this.pdfVersion = user.profile.pdf.pdfVersion;
      this.pdfId = user.profile.pdf.pdfId;
      // download cv file
      const url = 'https://res.cloudinary.com/dnf8ntdmr/image/upload/v' + this.pdfVersion +'/'+this.pdfId+'.pdf';
      console.log('url', url);
      window.open(url, '_blank', 'top=100,left=200,width=1000,height=600');
    });
  }
  getApplayUser(applayUser) {
    setTimeout(() => {
      this.router.navigate([`/employee/user-profile/${applayUser}`]);
     }, 1000);
  }
  deleteCandidate(applayUser) {
    this.employerService.deleteApplayUser(applayUser, this.jobId).subscribe((data) => {
      window.location.reload();
    });
  }
  getJobLink(jobId) {
    setTimeout(() => {
      window.location.href = `/job/job-detail/${jobId}`;
    }, 1000);
  }


}
