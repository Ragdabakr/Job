import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'ng2-file-upload';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostJobComponent } from './post-job/post-job.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ViewProfilerComponent } from './view-profiler/view-profiler.component';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { ManageCandidateComponent } from './manage-candidate/manage-candidate.component';
import { ManageJobsComponent } from './manage-jobs/manage-jobs.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { CommonModule } from '../common/common.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { ManageBookmarksComponent } from './manage-bookmarks/manage-bookmarks.component';
import { ManageMessagesComponent } from './manage-messages/manage-messages.component';
import { EditJobComponent } from './edit-job/edit-job.component';



@NgModule({
  declarations: [PostJobComponent, CreateProfileComponent, ViewProfilerComponent, EmployerListComponent, ManageCandidateComponent, ManageJobsComponent, EditProfileComponent, ManageProfileComponent, ManageBookmarksComponent, ManageMessagesComponent, EditJobComponent],
  imports: [
    CommonModule,
    BrowserModule,
    CommonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule,
    BrowserAnimationsModule,
    CKEditorModule,
    CommonModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class EmployerModule { }
