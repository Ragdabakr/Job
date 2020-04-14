
import { Component, OnInit, ViewChild, NgZone  } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  postForm: FormGroup;
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
  items: any;
  constructor(
    // private adminService: AdminService ,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    public _zone: NgZone
  ) { }

  ngOnInit() {
    this.getUserProfile();
    this.postForm = this.fb.group ({
      title : ['', [Validators.required , Validators.minLength(2), Validators.maxLength(100)]],
      period: ['', [Validators.required]],
      paypalPlanId: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required , Validators.minLength(10), Validators.maxLength(1000)]],
      // PlanItems : this.fb.group ({
        PlanItems: this.fb.array([this.addPlanItem()]),
      // }),
    });
  }
  getUserProfile() {
    this.userId = this.auth.getUserId();
    this.auth.getUserById(this.userId).subscribe((user) => {
    this.user = user;
     });
    }
  postPlan(postForm): void {
    if (postForm.invalid) {
      this.alert = 'Make sure that you fill out all required fields';
      this.validateAllFormFields(this.postForm); // Triger postForm validation
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 8000);

     } else {

    this.adminService.postPlan(this.userId , postForm.value).subscribe((data) =>{
        });
    window.scroll(0, 0); // scroll to top of page;
    this.successAlert = 'Your job is added succeccfuly';
    this.success = true;
    setTimeout(() => {
      this.success = false;
      window.location.href = '/admin/plans';
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
// Plans Array

addPlanItemButtonClick(): void {
  const allItems = this.postForm.controls.PlanItems as FormArray;
  this.items = allItems.value;
  allItems.push(this.addPlanItem());
}
addPlanItem(): FormGroup {
  return this.fb.group({
    item: ['', [Validators.required]],
  });
}
reset() {
  this.postForm.reset();
}
}




