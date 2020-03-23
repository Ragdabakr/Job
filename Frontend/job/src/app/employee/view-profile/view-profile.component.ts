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
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
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
    private activatedRoute: ActivatedRoute,
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

  this.profileForm = this.fb.group({
    about : ['' , Validators.required],
   });

  this.jobForm = this.fb.group ({
  jobHistories: this.fb.array([this.addJobHistories()]),
  });

  this.skillForm = this.fb.group ({
   skills: this.fb.array([this.addSkills()]),
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

  getUserProfile() {
      this.userId = this.auth.getUserId();
      console.log(this.userId);
      this.auth.getUserById(this.userId).subscribe((user) => {
      this.userProfile = user;
      this.user = user;
      this.editCvForm(user);
      this.editAboutForm(user) ;
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

  editAccountData() {
    this.accountEdit = true;
  }

  // EditCvForm steps
 // COPY user data to cvForm
  editCvForm(user) {
    console.log(user);
    this.cvForm.patchValue({
      firstName : user.profile.firstName,
      lastName : user.profile.lastName,
      email : user.profile.email,
      phoneCode : user.profile.phoneCode,
      phoneNumber : user.profile.phoneNumber,
      nationality : user.profile.nationality,
      title : user.profile.title,
     });
  }

 // update cvform with new data
 mapValues() {
   this.user.firstName = this.cvForm.value.firstName;
   this.user.lastName = this.cvForm.value.lastName;
   this.user.email = this.cvForm.value.email;
   this.user.phoneCode = this.cvForm.value.phoneCode;
   this.user.phoneNumber = this.cvForm.value.phoneNumber;
   this.user.nationality = this.cvForm.value.nationality;
   this.user.title = this.cvForm.value.title;
 }
   // Send edit request
   submitCvForm() {
    this.mapValues();
    this.employeeService.editCvForm(this.userId , this.user).subscribe(() => {
    this.accountEdit = false;
    this.router.navigate(['view-profile']);
    location.reload();
   });
  }
  cancelCvForm(){
    this.accountEdit = false;
  }

    // EditpROFILEForm steps
 // COPY user data to cvForm
 editAboutData() {
   this.editAbout = true;
 }

 editAboutForm(user) {
  this.profileForm.patchValue({
    about : user.profile.about,
   });
}

// Update about form with new data
mapValuesAbout() {
 this.user.about = this.profileForm.value.about;
}
 // Send edit request
 submitAboutForm() {
  this.mapValuesAbout();
  this.employeeService.editAboutForm(this.userId , this.user).subscribe(() => {
  this.editAbout = false;
  this.router.navigate(['view-profile']);
  location.reload();
 });
}
cancelEditForm(){
  this.editAbout = false;
}
// Edit Jobs History

editJobsData(jobHistory) {
  this.jobHistoryId = jobHistory._id;
  this.singleJobHistory = jobHistory;
  this.editJobs = true;
  this.jobForm.patchValue({
    jobHistories: [{
    jobName: this.singleJobHistory.jobName,
    companyName: this.singleJobHistory.companyName,
    startYear: this.singleJobHistory.startYear,
    endYear: this.singleJobHistory.endYear,
    jobSummary: this.singleJobHistory.jobSummary,
      }]
   });
  }
  cancelJobForm(){
    this.editJobs = false;
  }
 // Jobs Array
  addJobHistories(): FormGroup {
    return this.fb.group({
      jobName: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      startYear: ['', [Validators.required]],
      endYear: ['', [Validators.required]],
      jobSummary: ['', [Validators.required]]
    });
  }

  submitJobForm(jobForm) {
    this.editingJobForm =  jobForm.value.jobHistories;
    this.employeeService.editSingleJobForm(this.userId , this.jobHistoryId , this.editingJobForm).subscribe(() => {
        this.editAbout = false;
        this.router.navigate(['view-profile']);
        location.reload();
       });
  }

  addNewJob(){
    this.addJob = true;
  }
  submitAddJobForm(jobForm){
    console.log(jobForm.value);
    this.employeeService.createJobHistories(this.jobForm.value).subscribe(
      (data) => {console.log(data);
      },
      (error) => {console.log(error);
      }
    );
  }
  cancelAddJobForm() {
    this.addJob = false;
  }

  deleteJob(jobHistory){
    this.idJobHistory = jobHistory._id;
    this.employeeService.deleteJob(this.userId, this.idJobHistory).subscribe(
      (data) => {
        location.reload();
        console.log(data);
      },
      (error) => {
        console.log(error);
        });
      }


  // Edit skills
  editSkillsData(skill) {
    this.skill = skill;
    this.skillId = skill._id;
    this.editSkills = true;
    this.skillForm.patchValue({
      skills : [{
        skillName : this.skill.skillName
      }]
    });
  }

  cancelEditSkillForm(){
    this.editSkills = false;
  }
  addSkills(): FormGroup {
    return this.fb.group({
      skillName: ['', [Validators.required]],
    });
  }
  submitSkillForm(skillForm) {
    console.log('singleSkill', skillForm.value);
    this.employeeService.editSingleSkillForm(this.userId , this.skillId , this.skillForm.value).subscribe(() => {
      this.editAbout = false;
      this.router.navigate(['view-profile']);
      location.reload();
     });
  }
  addNewSkill() {
    this.addSkill = true;
  }
  submitAddSkillForm(skillForm) {
    console.log(skillForm.value);
    this.employeeService.createSkill(this.skillForm.value).subscribe(
      (data) => {
        location.reload();
        console.log(data);
      },
      (error) => {console.log(error);
      }
    );
    }
  deleteSkill(skill) {
    this.idSkill = skill._id;
    this.employeeService.deleteSkill(this.userId, this.idSkill).subscribe(
      (data) => {
        location.reload();
        console.log(data);
      },
      (error) => {
        console.log(error);
        }
    )};

    // Edit Image
    editImage(){
      this.editImages = true;
    }
    cancelImageForm(){
      this.editImages = false;
    }
      // Image upload to cloudinary


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
    });
}
// Edit Image
editMyCv() {
  this.editCv = true;
}
cancelEditCv() {
  this.editCv = false;
}
  // Edit cv
OnCvSelect(event) {
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
     console.log('selectedPdf', this.selectedPdf);
   }).catch (err => console.log(err));
 }
 }


pdf(pdfForm) {
  console.log(pdfForm.value);
  this.pdfUploadProgress = '0%';
  this.employeeService.sendPdf(this.selectedPdf)
  .subscribe(events => {
    if (events.type === HttpEventType.UploadProgress) {
      this.pdfUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
      console.log(this.pdfUploadProgress);
    } else if (events.type === HttpEventType.Response) {
      this.pdfUploadProgress = '';
      location.reload();
      alert('SUCCESS !!');
    }
  });
}

}
