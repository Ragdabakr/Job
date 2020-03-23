import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule} from 'ngx-pagination';
import { JobListComponent} from './job-list/job-list.component';
import { JobSearchResultComponent } from './job-search-result/job-search-result.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobService } from './job.service';

@NgModule({
  declarations:  [
    JobListComponent,
    JobSearchResultComponent,
    JobDetailsComponent,

  ],
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
    NgxPaginationModule,
    
  ],
  providers: [JobService]
})
export class JobsModule { }
