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

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeeSidebarComponent } from './employee-sidebar/employee-sidebar.component';

// Model

@NgModule({
  declarations: [
        NavComponent,
        FooterComponent,
        SidebarComponent,
        EmployeeSidebarComponent,
    ],
  imports: [
    BrowserModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  entryComponents: [EmployeeSidebarComponent ],
  exports: [
    EmployeeSidebarComponent ,
    NavComponent,
    FooterComponent,
    SidebarComponent
  ],
})
export class CommonModule {}
