import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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



@NgModule({
  declarations: [PostJobComponent, CreateProfileComponent, ViewProfilerComponent, EmployerListComponent],
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
  ]
})
export class EmployerModule { }
