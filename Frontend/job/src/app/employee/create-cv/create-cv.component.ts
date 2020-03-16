import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Upload } from 'src/app/common/models/upload.model';

import { AngularFireDatabase } from 'angularfire2/database';
import { BsDatepickerConfig , BsModalRef } from 'ngx-bootstrap';
import { FileUploader} from 'ng2-file-upload';
import { HttpClient, HttpEventType } from '@angular/common/http';



const URL = 'http://localhost:3001/api/v1/image/upload-image';


@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.scss']
})
export class CreateCvComponent implements OnInit {
  fileUploadProgress: string = null;

  // image Requirements
  uploader: FileUploader = new FileUploader ({
    url: URL,
    disableMultipart: true
  });
  cvForm: FormGroup;
  profileForm: FormGroup;
  skillForm: FormGroup;
  imageForm: FormGroup;
  pdfForm: FormGroup;
  countries = [];

    currentUpload: File;
    successMessage: string;
    progress = false;
    errorMessage: string;
    file: File;
    fileInput: FileList;
    fileUpload: any;
    user: any;
    defaultPhoto: string;
    controls: any;
  
    // preview uploaded photo
    public imagePath;
    imgURL: any;
    public message: string;
    pdfFileUpload: File;
    currentFileUpload: Upload;
    progress2: boolean;

    // BirthDate
    datePickerConfig: Partial<BsDatepickerConfig>;
    dateOfBirth = new Date(2017, 0, 30);
    selectedFile: any;
    url: any;

   //// get upload url from service by using subscription
   messages: any = {}  ;
    imageUrl: any;
    pdfUrl: any;
   allSkills = [];
  jobForm: FormGroup;
  allJobHistories: any;
  fileAvalable: boolean;
  uploadedFile: File;
  pdfUploadProgress: string;
  selectedPdf: any;

  constructor(
    private employeeService: EmployeeService ,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router) { 

            // Date of birth
            this.datePickerConfig = Object.assign({},
              {
                containerClass : 'theme-dark-blue' ,
                showWeekNumbers : false,
                minDate : new Date(2000, 0 ,  1),
                maxDate : new Date(2019 , 0 , 1),
                dateInputFormat : 'DD/MM/YY',
                });
    }

  ngOnInit() {
    this.getCountries();
    this.imageForm = this.fb.group ({
      profileImage: ['', Validators.required]
    });
    this.cvForm = this.fb.group ({
      firstName : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      lastName : ['',  [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['', [Validators.required , Validators.email]],
      phoneCode: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
    this.profileForm = this.fb.group ({
      birthDate : ['', [Validators.required]],
      nationality : ['',  [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      country: ['', [Validators.required ]],
      title: ['', Validators.required, Validators.minLength(2), Validators.maxLength(10)],
      about: ['', Validators.required , Validators.minLength(2), Validators.maxLength(10)]
    });
    this.skillForm = this.fb.group ({
      skills: this.fb.array([this.addSkills()]),
    });
    this.jobForm = this.fb.group ({
      jobHistories: this.fb.array([this.addJobHistories()]),
    });
    this.pdfForm = this.fb.group ({
      pdf: ['', Validators.required]
    });

  }

  // Get all countries
   getCountries() {
   this.employeeService.getCountries().subscribe((countries) => {
    this.countries = countries;
    });
  }

  // Image upload to cloudinary

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

  OnFileSelect(event) {
    const file: File = event[0];
    this.uploadedFile = file;
    const sizeImage = file.size;
    console.log('sizeImage', file);
    if (sizeImage > 169999) {
         this.fileAvalable = false;
         alert('File is too big!');
         const fileImage = '';
         this.progress = false;
         this.ReadAsBase64(fileImage).then(result => {
         this.selectedFile = result;
        }).catch (err => console.log(err));
    } else {
        this.ReadAsBase64(file).then(result => {
          this.selectedFile = result;
          console.log('file',this.selectedFile);
        }).catch (err => console.log(err));
      }
   }


   image(imageForm) {
    this.fileUploadProgress = '0%';
    this.employeeService.sendProfileImage(this.selectedFile)
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        alert('SUCCESS !!');
      } 
    }) 
}



// cv upload 
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
     this.pdf(this.pdfForm);
     console.log('selectedPdf',this.selectedPdf);
   }).catch (err => console.log(err));
 }
 }


pdf(pdfForm) {
  console.log(pdfForm.value);
  this.pdfUploadProgress = '0%';
  this.employeeService.sendPdf(this.selectedPdf)
  .subscribe(events => {
    if(events.type === HttpEventType.UploadProgress) {
      this.pdfUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
      console.log(this.pdfUploadProgress);
    } else if(events.type === HttpEventType.Response) {
      this.pdfUploadProgress = '';
      alert('SUCCESS !!');
    } 
  }) 
}

  account(cvForm) {
    this.employeeService.createProfile(this.cvForm.value).subscribe(
      (data) => {console.log(data)},
      (error) => {console.log(error)}
    );
  }
  profile(profileForm) {
    this.employeeService.createAccount(this.profileForm.value).subscribe(
      (data) => {console.log(data)},
      (error) => {console.log(error)}
    );
  }

  skills(skillForm) {
    console.log(skillForm.value);
    this.employeeService.createSkill(this.skillForm.value).subscribe(
      (data) => {console.log(data)},
      (error) => {console.log(error)}
    );
  }
  jobs(jobForm) {
    console.log(jobForm.value);
    this.employeeService.createJobHistories(this.jobForm.value).subscribe(
      (data) => {console.log(data)},
      (error) => {console.log(error)}
    );
  }

// skills Array

addSkillsButtonClick(): void {
  const skills = this.skillForm.controls.skills as FormArray;
  this.allSkills = skills.value;
  console.log(this.allSkills);
  skills.push(this.addSkills());
}
addSkills(): FormGroup {
return this.fb.group({
  skillName: ['', [Validators.required]],
});
}

// Jobs Array

addJobsButtonClick(): void {
  const jobHistories = this.jobForm.controls.jobHistories as FormArray;
  this.allJobHistories = jobHistories.value;
  console.log(this.allJobHistories);
  jobHistories.push(this.addJobHistories());
}
addJobHistories(): FormGroup {
  return this.fb.group({
    jobName: ['', [Validators.required]],
    companyName: ['', [Validators.required]],
    startYear: ['', [Validators.required]],
    endYear: ['', [Validators.required]],
    jobSummary: ['', [Validators.required]]
  });
}

}
