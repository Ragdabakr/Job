
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Upload } from 'src/app/common/models/upload.model';
import { FileUploader} from 'ng2-file-upload';




const URL = 'http://localhost:3001/api/v1/image/upload-image';
@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.scss']
})
export class ViewUserProfileComponent implements OnInit {
  fileUploadProgress: string = null;

  // image Requirements
  uploader: FileUploader = new FileUploader ({
    url: URL,
    disableMultipart: true
  });


  userId: any;
  userProfile = {};
  jobHistories = [];
  skills = [];
  fileUrl;
  pdfVersion: any;
  pdfId: any;
  messageForm: FormGroup;
  
  // preview uploaded photo
  public imagePath;
  imgURL: any;
  public message: string;
  pdfFileUpload: File;
  currentFileUpload: Upload;
  progress2: boolean;
  pdfUploadProgress: string;
  selectedFile: any;
  selectedPdf: string;
  bookmarked: boolean;
  bookmarks: any;
  user:any;

  // Edit
  accountEdit: boolean = false;
  cvForm: FormGroup;
  countries = [];
  profileForm: FormGroup;
  editAbout: boolean = false;
  editJobs: boolean = false;
  jobForm: FormGroup;
  singleJobHistory: any;
  jobHisoryId: any;
  jobHistoryId: any;
  editingJobForm: any;
  editSkills: boolean = false;
  skillForm: FormGroup;
  skill: any;
  skillId: any;
  addSkill: boolean = false;
  idSkill: any;
  addJob: boolean;
  idJobHistory: any;
 editImages :boolean = false;
  uploadedFile: File;
  fileAvalable: boolean;
  progress: boolean;
  editCv: boolean;
  pdfForm: FormGroup;
  constructor(
    private modalService: NgbModal,
    private employeeService: EmployeeService ,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router) {
     }

  ngOnInit() {
  this.getUserProfile();
  this.getCountries();
  this.messageForm = this.fb.group ({
    name : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    email: ['', [Validators.required , Validators.email]],
    message: ['', Validators.required],
    attachments: ['',]
  });

  this.cvForm = this.fb.group ({
    firstName : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    lastName : ['',  [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    email: ['', [Validators.required , Validators.email]],
    phoneCode: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    nationality : ['' , Validators.required],
    title : ['' , Validators.required],
   });

  }

 

   // Get all countries
   getCountries() {
    this.employeeService.getCountries().subscribe((countries) => {
     this.countries = countries;
     });
   }

  getUserProfile() {
      this.userId = this.route.snapshot.paramMap.get('id');
      console.log(this.userId);
      this.auth.getUserById(this.userId).subscribe((user) => {
      this.userProfile = user;
      this.user = user;
      console.log(this.userProfile);
      this.jobHistories = user.profile.jobHistories;
      console.log(this.jobHistories);
      this.bookmarks = user.bookmarkUsers;
      this.skills = user.profile.skills;

      // Check bookmarked
      const userId = this.userId;
      console.log(this.bookmarks);
      if (this.bookmarks.some(bookmark => bookmark.userId === userId)) {
        this.bookmarked = true;
       } else {
        this.bookmarked = false;
       }
      });
    }
    fullJobSummary() {
      const element = document.getElementById('text');
      console.log(element);
      element.classList.remove('myStyle');
      const showButton = document.getElementById('fullButton');
      showButton.classList.add('hide');
      showButton.classList.remove('show');
      const hideButton = document.getElementById('lessButton');
      hideButton.classList.add('show');
      hideButton.classList.remove('hide');

    }
    lessJobSummary() {
      const element = document.getElementById('text');
      console.log(element);
      element.classList.add('myStyle');
      const showButton = document.getElementById('fullButton');
      showButton.classList.remove('hide');
      showButton.classList.add('show');
      const hideButton = document.getElementById('lessButton');
      hideButton.classList.remove('show');
      hideButton.classList.add('hide');
    }
    downloadPdf( ) {
      this.auth.getUserById(this.userId).subscribe((user) => {
        this.pdfVersion = user.profile.pdf.pdfVersion;
        this.pdfId = user.profile.pdf.pdfId;
        // download cv file
        const url = 'https://res.cloudinary.com/dnf8ntdmr/image/upload/v' + this.pdfVersion +'/'+this.pdfId+'.pdf';
        console.log('url', url);
        window.open(url, '_blank', 'top=100,left=200,width=1000,height=600');
      });
    }

   // cv upload
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

messages(messageForm) {
  this.employeeService.createMessage(messageForm.value , this.selectedPdf , this.userId)
  .subscribe(messgaeData => {
    this.router.navigate(['/view-profile']);
  });
  this.pdfUploadProgress = '0%';
  this.employeeService.sendMessagePdf(this.selectedPdf)
  .subscribe(events => {
    if (events.type === HttpEventType.UploadProgress) {
      this.pdfUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
      console.log(this.pdfUploadProgress);
    } else if (events.type === HttpEventType.Response) {
      this.pdfUploadProgress = '';
      alert('SUCCESS !!');
    }
  });
}

OnPdfSelect(event) {
  console.log(event);
  const pdfFile: File = event[0];
  const pdfSize = pdfFile.size;
  if (pdfSize > 1699999) {
    alert('File is too big!');
    const filePdf = '';
    this.ReadAsBase64(filePdf).then(result => {
    this.selectedFile = result;
   }).catch (err => console.log(err));
} else {
   this.ReadAsBase64(pdfFile).then(result => {
     this.selectedPdf = result;
    //  console.log('selectedPdf',this.selectedPdf);
   }).catch (err => console.log(err));
 }
 }

 bookmark() {
   console.log(this.userId);
   this.employeeService.createUserBookmark(this.userId).subscribe((data) => {
      this.bookmarked = true;
  });
}

 
}
