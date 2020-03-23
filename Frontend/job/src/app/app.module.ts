import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import {NO_ERRORS_SCHEMA} from '@angular/core';
// phone select code
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
//editor
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeModule } from './employee/employee.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployerModule } from './employer/employer.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { JobsModule } from './jobs/jobs.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from './common/common.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    NgSelectModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AuthModule,
    JobsModule,
    EmployeeModule,
    EmployerModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxPaginationModule,
    CKEditorModule,
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  providers: [],
  bootstrap: [AppComponent ]
})
export class AppModule {}
