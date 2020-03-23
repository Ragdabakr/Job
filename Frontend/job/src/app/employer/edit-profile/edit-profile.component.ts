
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { EmployerService } from '../employer.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Upload } from 'src/app/common/models/upload.model';

import { AngularFireDatabase } from 'angularfire2/database';
import { BsDatepickerConfig , BsModalRef } from 'ngx-bootstrap';
import { FileUploader} from 'ng2-file-upload';
import { HttpClient, HttpEventType } from '@angular/common/http';
// Text editior (ck editor)
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const URL = 'http://localhost:3001/api/v1/image/upload-image';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  // Editor
  public Editor = ClassicEditor;
  fileUploadProgress: string = null;
  // image Requirements
  uploader: FileUploader = new FileUploader ({
    url: URL,
    disableMultipart: true
  });
  imageForm: FormGroup;
  cvForm: FormGroup;
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
    error: string;

   //// get upload url from service by using subscription
   messages: any = {}  ;
    imageUrl: any;
  fileAvalable: boolean;
  uploadedFile: File;
  selectedPdf: any;
  selectedFile: any;
  successAlert: string;
  success: boolean;
  userId: string;
  htmldata: any;
  socialForm: FormGroup;
  allSocials: any;
  social: any;
  socialName: any;
  socialLink: any;
  socialId: any;
  idSocial: any;
  openAddSocial: boolean;
  openEditSocial: boolean;

  constructor(
    private employerService: EmployerService ,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.auth.getUserById(this.userId).subscribe((user) => {
      this.user = user;
      this.socials = user.profile.socials;
      console.log('socials', this.socials);
      this.editCvForm(user);
    });
    this.getCountries();
    this.imageForm = this.fb.group ({
      profileImage: ['', Validators.required]
    });
    this.cvForm = this.fb.group ({
      firstName : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['', [Validators.required , Validators.email]],
      phoneCode: ['', ],
      phoneNumber: ['', ],
      about : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', ],
    });
    this.socialForm = this.fb.group ({
      socials: this.fb.array([this.addSocial()]),
    });
  }

  // Get all countries
   getCountries() {
   this.employerService.getCountries().subscribe((countries) => {
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
          console.log('file', this.selectedFile);
        }).catch (err => console.log(err));
      }
   }

   image(imageForm) {
    this.fileUploadProgress = '0%';
    this.employerService.sendProfileImage(this.selectedFile)
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        alert('SUCCESS !!');
        window.location.reload();
      }
    });
}

// COPY user data to cvForm
editCvForm(user) {
  console.log(user);
  this.cvForm.patchValue({
    firstName : user.profile.firstName,
    lastName : user.profile.lastName,
    email : user.profile.email,
    phoneCode : user.profile.phoneCode,
    phoneNumber : user.profile.phoneNumber,
    country : user.profile.country,
    city : user.profile.city,
    street : user.profile.street,
    about : user.profile.about,
   });
}

// update cvform with new data
mapValues() {
 this.user.firstName = this.cvForm.value.firstName;
 this.user.lastName = this.cvForm.value.lastName;
 this.user.email = this.cvForm.value.email;
 this.user.phoneCode = this.cvForm.value.phoneCode;
 this.user.phoneNumber = this.cvForm.value.phoneNumber;
 this.user.country = this.cvForm.value.country;
 this.user.city = this.cvForm.value.city;
 this.user.street = this.cvForm.value.street;
}

submitCvForm(cvForm) {
  if (cvForm.invalid) {
      this.validateAllFormFields(this.cvForm); // Triger postForm validation
  } else {
  const about = this.cvForm.get('about').value;
  const html = about;
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.textContent || div.innerText || '';
  this.employerService.editAccountForm(this.userId , cvForm.value , text).subscribe((data) =>{
    });
  window.scroll(0, 0); // scroll to top of page;
  this.successAlert = 'Your Profile is edit succesfully';
  this.success = true;
  window.location.reload();
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

// social Array
addSocialsButtonClick(): void {
  this.openAddSocial = true;
  const socials = this.socialForm.controls.socials as FormArray;
  this.allSocials = socials.value;
  socials.push(this.addSocial());
}
addSocial(): FormGroup {
return this.fb.group({
  socialName: ['', [Validators.required]],
  socialLink: ['', [Validators.required]],
});
}
socials(socialForm) {
  // tslint:disable-next-line: no-debugger
  debugger;
  console.log('aswfgerge', socialForm.value);
  this.employerService.createSocial(this.socialForm.value).subscribe(
    (data) => {console.log(data)});
  window.scroll(0, 0); // scroll to top of page;
  this.successAlert = 'Your SocialAcoounts are  added succesfully';
  this.success = true;
    }

  // Edit socials
  editSocialData(social) {
    this.openEditSocial = true;
    this.social = social;
    this.socialId = social._id;
    // this.socialName = social.socialName;
    // this.socialLink = social.socialLink;
    this.socialForm.patchValue({
      socials : [{
        socialName : this.social.socialName,
        socialLink : this.social.socialLink
      }]
    });
  }

  cancelEditSkillForm() {
    this.openEditSocial = false;
  }
  submitSocialForm(socialForm) {
    console.log('singleSkill', socialForm);
    this.employerService.editSingleSocial(this.userId , this.socialId , socialForm.value).subscribe(() => {
    this.openEditSocial = false;
    location.reload();
     });
  }
  deleteSocial(social) {
    this.idSocial = social._id;
    this.employerService.deleteSocial(this.userId, this.idSocial).subscribe(
      (data) => {
        location.reload();
      },
      (error) => {
        console.log(error);
        }
    )}
}


