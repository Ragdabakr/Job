import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class  JobService {

  constructor(private http: HttpClient) { }

public getCountries(): Observable<any> {
  return this.http.get('/api/v1/lookup/countries');
}

public jobList( ): Observable<any> {
  return this.http.get(`/api/v1/jobs/job-list`);
}
public getJobsSearch(keywordSearch: string, locationSearch: string): Observable<any> {
  return this.http.get(`/api/v1/jobs?keyword=${keywordSearch}&location=${locationSearch}`);
 }

 public sendNotificationEmail(location: string, keyword: string): Observable<any> {
  return this.http.post(`/api/v1/jobs/sendNotificationEmail` , {location , keyword});
 }
 public getJob(id): Observable<any> {
  return this.http.get(`/api/v1/jobs/job-details/${id}`);
 }
 public  userApplayForJob(jobId , userData): Observable<any> {
  return this.http.post(`/api/v1/jobs/userApplay`, { jobId , userData});
 }
 public sendApplayJob(pdf: string , applayJob , jobId): Observable<any> {
  return this.http.post(`/api/v1/jobs/applay-job/${jobId}`, {pdf , applayJob} , {
    reportProgress: true,
    observe: 'events'
  });
 }
 public getSimilarJobs(key: string): Observable<any> {
  return this.http.get(`/api/v1/jobs/simillerJobs?key=${key}`);
 }
}
