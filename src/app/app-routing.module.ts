import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { JobCreateComponent } from './components/job/job-create/job-create.component';
import { JobListComponent } from './components/job/job-list/job-list.component';
import { JobReadComponent } from './components/job/job-read/job-read.component';
import { JobUpdateComponent } from './components/job/job-update/job-update.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'jobs',            component:   JobListComponent },
      { path: 'jobs/create',     component: JobCreateComponent },
      { path: 'jobs/update/:id', component: JobUpdateComponent },
      { path: 'jobs/read/:id',   component:    JobReadComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
