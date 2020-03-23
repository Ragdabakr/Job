import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http: HttpClient) { }

public getCountries(): Observable<any> {
  return this.http.get('/api/v1/lookup/countries');
}

public postJob(userId ,  jobForm ): Observable<any> {
  return this.http.post(`/api/v1/employer/postJob` , {userId , jobForm });
}
public sendProfileImage(image: string): Observable<any> {
  return this.http.post('/api/v1/image/upload-image', {image} , {
    reportProgress: true,
    observe: 'events'   
  });
}
public createProfileForm(userId , cvForm: any ,text ): Observable<any> {
  return this.http.post('/api/v1/employer/create-profile' , {userId , cvForm , text});
 }
 public findOpenJobs(userId): Observable<any> {
  return this.http.get(`/api/v1/employer/openJobs/${userId}`);
} 
public createSocial( socialForm: any): Observable<any> {
  return this.http.post('/api/v1/employer/create-social' , {socialForm});
 }
 public createCompanyBookmark(companyId): Observable<any> {
  return this.http.post('/api/v1/employer/create-bookmark-company' , {companyId});
 }
 public deleteJob(jobId): Observable<any> {
  return this.http.post('/api/v1/employer/delete-job' , {jobId});
 }
 public deleteApplayUser(applayUser , jobId): Observable<any> {
  return this.http.post('/api/v1/employer/delete-applayUser' , {applayUser , jobId});
 }
 public editAccountForm(userId , cvForm , text ): Observable<any> {
  return this.http.post('/api/v1/employer/edit-account-form' , {userId , cvForm , text });
 }
 public editSingleSocial(userId , socialId , socialForm ): Observable<any> {
  return this.http.post('/api/v1/employer/edit-social-form' , {userId , socialId , socialForm });
 }
 public deleteSocial(userId , socialId): Observable<any> {
  return this.http.post(`/api/v1/employer/delete-social` , {userId , socialId});
}
public deleteBookmarkEmployee(userId , employeeId): Observable<any> {
  // tslint:disable-next-line: no-debugger
  debugger;
 return this.http.post(`/api/v1/employer/delete-userBookmark` , {userId , employeeId});
}
}

