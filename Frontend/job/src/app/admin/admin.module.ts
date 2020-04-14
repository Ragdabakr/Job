import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployersComponent } from './employers/employers.component';
import { JobsComponent } from './jobs/jobs.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PlansComponent } from './plans/plans.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '../common/common.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    EmployeesComponent,
    EmployersComponent,
    JobsComponent,
    InvoicesComponent,
    PlansComponent],
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
    CKEditorModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class AdminModule { }
