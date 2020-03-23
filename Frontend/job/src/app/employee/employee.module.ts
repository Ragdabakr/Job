import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'ng2-file-upload';
// import 'hammerjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// for route
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// phone select code
import { NgSelectModule } from '@ng-select/ng-select';
// Date
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateCvComponent } from './create-cv/create-cv.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { CommonModule } from '../common/common.module';
import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';
import { ManageBookmarksEmployeeComponent } from './manage-bookmarks-employee/manage-bookmarks-employee.component';
import { ManageMessagesEmployeeComponent } from './manage-messages-employee/manage-messages-employee.component';
import { ManageProfileEmployeeComponent } from './manage-profile-employee/manage-profile-employee.component';
// Model

@NgModule({
  declarations: [CreateCvComponent ,
     EditProfileComponent,
     ViewProfileComponent,
     EmployeeListComponent,
     AppliedJobsComponent,
     ViewUserProfileComponent,
     ManageBookmarksEmployeeComponent,
     ManageMessagesEmployeeComponent,
     ManageProfileEmployeeComponent,
    
    ],
  imports: [
    BrowserModule,
    CommonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [AppliedJobsComponent ],
  entryComponents: []
})
export class EmployeeModule {}
