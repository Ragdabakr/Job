import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthModule } from './auth/auth.module';
import { VerifyComponent } from './auth/verify/verify.component';
import { EmployeeModule } from './employee/employee.module';
import { CreateCvComponent } from './employee/create-cv/create-cv.component';
// import { HomeComponent } from './home/home.component';



// Import canActivate guard services
// import { SecureInnerPagesGuard } from './auth/guard/secure-inner-pages';
// import { AuthGuard } from './auth/guard/auth.guard';
// import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
// import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
// import { ProfileComponent } from './employee/profile/profile.component';
import { ViewProfileComponent } from './employee/view-profile/view-profile.component';
import { PostJobComponent } from './employer/post-job/post-job.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/shared/auth.guard';
import { DeactivateGuard } from './auth/shared/deactive.guard';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobSearchResultComponent } from './jobs/job-search-result/job-search-result.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { CreateProfileComponent } from './employer/create-profile/create-profile.component';
import { ViewProfilerComponent } from './employer/view-profiler/view-profiler.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'verfiy', component: VerifyComponent },
  {path: 'dashboard-create-employee-profile', component: CreateCvComponent,
  canActivate: [AuthGuard] },
  {path: 'dashoard-view-employee-profile', component: ViewProfileComponent,
  canActivate: [AuthGuard] },
  {path: 'dashoard-view-employer-profile', component: ViewProfilerComponent,
  canActivate: [AuthGuard] },
  {path: 'view-company-profile/:id', component: ViewProfilerComponent,
  canActivate: [AuthGuard] },
  {path: 'dashoard-create-employer-profile', component: CreateProfileComponent,
  canActivate: [AuthGuard] },
  {path: 'post-job', component: PostJobComponent,
    canActivate: [AuthGuard]},
  {path: 'job-detail/:id', component: JobDetailsComponent},
  {path: 'job-list', component: JobListComponent},
  {path: 'jobs/:locationSearch/:keywordSearch/homes', component: JobSearchResultComponent },
  {path: '404', component: PageNotFoundComponent },
  
  // {path: '' , redirectTo: '/login' , pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule,
    EmployeeModule,

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
