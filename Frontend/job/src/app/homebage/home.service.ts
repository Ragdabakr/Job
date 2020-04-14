import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

 public getPaypalPlan(PlanId): Observable<any> {
  return this.http.get(`/api/v1/payment/createagreement/${PlanId}`);
 }
 public getPlans(): Observable<any> {
 return this.http.get('/api/v1/admin/plans');
}
public getPlan(planId): Observable<any> {
 return this.http.get(`/api/v1/admin/plans/${planId}`);
}
public getPaidCompanies(): Observable<any> {
  return this.http.get(`/api/v1/home/paid-jobse`);
 }
 public getPaidEmployees(): Observable<any> {
  return this.http.get(`/api/v1/home/paid-employees`);
 }
 public getAllJobs(): Observable<any> {
  return this.http.get(`/api/v1/home/jobs`);
 }
 public getAllemployees(): Observable<any> {
  return this.http.get(`/api/v1/home/employees`);
 }
 

}
