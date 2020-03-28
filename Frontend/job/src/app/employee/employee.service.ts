import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

public getCountries(): Observable<any> {
  return this.http.get('/api/v1/lookup/countries');
}
public sendProfileImage(image: string): Observable<any> {
  return this.http.post('/api/v1/image/upload-image', {image} , {
    reportProgress: true,
    observe: 'events'   
  });
}

public sendPdf(pdf: string): Observable<any> {
  // tslint:disable-next-line: no-debugger
  debugger;
  return this.http.post('/api/v1/image/upload-pdf', {pdf} , {
    reportProgress: true,
    observe: 'events'
  });
 }

 public createProfile(cvForm: any): Observable<any> {
  return this.http.post('/api/v1/employee/create-profileForm' , cvForm);
 }
 public createAccount(profileForm: any): Observable<any> {
 return this.http.post('/api/v1/employee/create-accountForm' , profileForm);
}
public createSkill(skillForm: any): Observable<any> {
 return this.http.post('/api/v1/employee/create-skillForm' , skillForm);
}
public createJobHistories(jobForm: any ): Observable<any> {
 return this.http.post('/api/v1/employee/create-jobHistoriesForm' , jobForm);
}

public sendMessagePdf(pdf: string): Observable<any> {
  // tslint:disable-next-line: no-debugger
  debugger;
  return this.http.post('/api/v1/image/upload-message-pdf', {pdf} , {
    reportProgress: true,
    observe: 'events'
  });
 }

 public createUserBookmark(userId: any ): Observable<any> {
  return this.http.post('/api/v1/employee/create-bookmark-users' , {userId});
 }
 public editCvForm(userId: any , cvForm ): Observable<any> {
   return this.http.post(`/api/v1/employee/edit-CvForm` , {userId , cvForm});
 }
 public editAboutForm(userId: any , aboutForm ): Observable<any> {
  return this.http.post(`/api/v1/employee/edit-aboutForm` , {userId , aboutForm});
}
public editJobForm(userId: any , jobForm ): Observable<any> {
  return this.http.post(`/api/v1/employee/edit-aboutForm` , {userId , jobForm});
}
public editSingleJobForm(userId , jobHistoryId, jobForm ): Observable<any> {
  return this.http.post(`/api/v1/employee/edit-jobHistoryForm` , {userId , jobHistoryId, jobForm});
}
public editSingleSkillForm(userId , skillId, skillForm ): Observable<any> {
  return this.http.post(`/api/v1/employee/edit-skillForm` , {userId , skillId, skillForm });
}
public deleteSkill(userId , skillId): Observable<any> {
  return this.http.post(`/api/v1/employee/delete-skill` , {userId , skillId});
}
public deleteJob(userId , idJobHistory): Observable<any> {
  return this.http.post(`/api/v1/employee/delete-job` , {userId , idJobHistory});
}
public deleteApplayJob(jobId): Observable<any> {
 return this.http.post('/api/v1/employee/delete-applay-job' , {jobId});
}
public createMessage(messageForm: any , pdf: any ,senderId , reciverId , senderName, reciverName ): Observable<any> {
  // tslint:disable-next-line: no-debugger
  debugger;
  return this.http.post('/api/v1/message/send-message' , {messageForm , pdf , senderId , reciverId , senderName , reciverName});
 }


}

