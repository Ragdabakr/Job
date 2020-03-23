import { Component, OnInit, ViewChild, NgZone  } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { EmployerService } from '../employer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
  // This line for deactivate link
  @ViewChild('postJobForm', {static: false}) public jobForm: FormGroup;
  postJobForm: FormGroup;
  types = [
    {name: 'Full Time', id: 'AZ'},
    {name: 'Freelance', id: 'CA'},
    {name: 'Part Time', id: 'CO'},
    {name: 'Internship', id: 'NY'},
    {name: 'Temporary', id: 'PA'},
  ];

  categories = [
    {name: 'Accounting and Finance', id: '1'},
    {name: 'Clerical & Data Entry', id: '2'},
    {name: 'Public Relations', id: '3'},
    {name: 'Internship', id: '4'},
    {name: 'TMiscellaneous', id: '5'},
    {name: 'IT and Computers', id: '6'},
    {name: 'Law Enforcement', id: '7'},
    {name: 'Counseling', id: '8'},
    {name: 'Medicine', id: '9'},
    {name: 'Engineering', id: '10'},
    {name: 'Management', id: '11'},
    {name: 'Medicine', id: '12'},
    {name: 'other', id: '13'},
  ];
  errorAlert: string;
  userId: any;
  user: any;
  alert: string;
  error: boolean;
  successAlert: string;
  success: boolean;
  errors: any;

      // ExpDate
      datePickerConfig: Partial<BsDatepickerConfig>;
      dateOfBirth = new Date(2017, 0, 30);
      selectedFile: any;
      url: any;
  constructor(
    private employerService: EmployerService ,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    public _zone: NgZone
  ) { }

  ngOnInit() {
    this.getUserProfile();
    this.postJobForm = this.fb.group ({
      title : ['', [Validators.required , Validators.minLength(2), Validators.maxLength(100)]],
      companyName : ['',  [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      location : ['',  [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required , Validators.email]],
      type: [''],
      category: ['', [Validators.required]],
      min: [''],
      expDate: [''],
      max: [''],
      job: ['', [Validators.required , Validators.minLength(10), Validators.maxLength(1000)]]
    });
  }
  getUserProfile() {
    this.userId = this.auth.getUserId();
    this.auth.getUserById(this.userId).subscribe((user) => {
    this.user = user;
     });
    }
  postJob(postJobForm): void {
    if (postJobForm.invalid) {
      this.alert = 'Make sure that you fill out all required fields';
      this.validateAllFormFields(this.postJobForm); // Triger postForm validation
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 8000);

     } else {

    this.employerService.postJob(this.userId , postJobForm.value).subscribe((data) =>{
        });
    window.scroll(0, 0); // scroll to top of page;
    this.successAlert = 'Your job is added succeccfuly';
    this.success = true;
    setTimeout(() => {
      this.success = false;
      window.location.href = '/job-list';
      }, 7000);
     }
  }

// To validate all form fields, we need to iterate throughout all form controls:
validateAllFormFields(formGroup: FormGroup) {
Object.keys(formGroup.controls).forEach(field => {
  const control = formGroup.get(field);
  if (control instanceof FormControl) {
    control.markAsTouched({ onlySelf: true });
  } else if (control instanceof FormGroup) {
    this.validateAllFormFields(control);
  }
});
}
reset() {
  this.postJobForm.reset();
}
changedVal(type) {
  this.postJobForm.controls['type'].setValue(type);
}
changedCategory(category) {
  this.postJobForm.controls['category'].setValue(category);
}


}
