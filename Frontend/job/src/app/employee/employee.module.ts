import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FileUploadModule } from "ng2-file-upload";
// import 'hammerjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
// for route
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// phone select code
import { NgSelectModule } from "@ng-select/ng-select";
// Date
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { ViewProfileComponent } from "./view-profile/view-profile.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateCvComponent } from './create-cv/create-cv.component';
// Model

@NgModule({
  declarations: [CreateCvComponent , EditProfileComponent, ViewProfileComponent, EmployeeListComponent],
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
  entryComponents: [ViewProfileComponent]
})
export class EmployeeModule {}
