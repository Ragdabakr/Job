import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
// phone select code
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
//editor
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './common/nav/nav.component';
import { FooterComponent } from './common/footer/footer.component';
import { AuthModule } from './auth/auth.module';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeModule } from './employee/employee.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployerModule } from './employer/employer.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { JobsModule } from './jobs/jobs.module';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    SidebarComponent,
    EmployeeComponent,
    PageNotFoundComponent,

  ],
  imports: [
    NgSelectModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    JobsModule,
    EmployeeModule,
    EmployerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxPaginationModule,
    CKEditorModule
  ],
  
  providers: [],
  bootstrap: [AppComponent ]
})
export class AppModule { }
