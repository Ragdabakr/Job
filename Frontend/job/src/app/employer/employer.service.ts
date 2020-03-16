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
  return this.http.post(`/api/v1/employeer/postJob` , {userId , jobForm });
}
public sendProfileImage(image: string): Observable<any> {
  return this.http.post('/api/v1/image/upload-image', {image} , {
    reportProgress: true,
    observe: 'events'   
  });
}
public createProfileForm(userId , cvForm: any ,text ): Observable<any> {
  return this.http.post('/api/v1/employeer/create-profile' , {userId , cvForm , text});
 }
 public findOpenJobs(userId): Observable<any> {
  return this.http.get(`/api/v1/employeer/openJobs/${userId}`);
} 
public createSocial( socialForm: any): Observable<any> {
  return this.http.post('/api/v1/employeer/create-social' , {socialForm});
 }
 public createCompanyBookmark(companyId): Observable<any> {
  return this.http.post('/api/v1/employeer/create-bookmark-company' , {companyId});
 }

}

