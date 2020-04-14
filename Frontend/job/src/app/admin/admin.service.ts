import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


public postPlan(userId ,  planForm ): Observable<any> {
  // tslint:disable-next-line: no-debugger
  debugger;
  return this.http.post(`/api/v1/admin/create-planForm` , {userId , planForm });
}
//  public findOpenJobs(userId): Observable<any> {
//   return this.http.get(`/api/v1/employer/openJobs/${userId}`);
// } 

//  public createCompanyBookmark(companyId): Observable<any> {
//   return this.http.post('/api/v1/employer/create-bookmark-company' , {companyId});
//  }
//  public deleteJob(jobId): Observable<any> {
//   return this.http.post('/api/v1/employer/delete-job' , {jobId});
//  }


}

