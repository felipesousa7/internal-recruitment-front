import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { Subscription } from 'src/app/models/subscription';
import { JobService } from 'src/app/services/job.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  isAdmin: boolean = false;

  constructor(
    private jobService: JobService,
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadJobs();
    this.isAdmin = this.authService.isAdmin();
  }

  loadJobs() {
    this.jobService.findAll().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  delete(jobId: any) {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      this.jobService.delete(jobId).subscribe(() => {
        this.loadJobs();
      });
    }
  }

  subscribe(jobTitle: string) {
    if (confirm('Tem certeza que deseja candidatar-se esta vaga?')) {
      const name = localStorage.getItem('name')
      this.subscriptionService.create({jobTitle: jobTitle, userName: name || ''}).subscribe(() => {
        this.loadJobs();
      });
    }
  }
}
