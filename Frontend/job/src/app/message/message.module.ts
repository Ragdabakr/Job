import { NgModule } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '../common/common.module';
import { MessageService } from './message.service';
import { AuthService } from '../auth/auth.service';
import {NgxAutoScrollModule} from "ngx-auto-scroll";



@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxAutoScrollModule,
  ],
  providers: [MessageService, AuthService]
})
export class MessageModule { }


