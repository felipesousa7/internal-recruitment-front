import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadJobs();
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
}
