import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-read',
  templateUrl: './job-read.component.html',
  styleUrls: ['./job-read.component.css']
})
export class JobReadComponent implements OnInit {

  job: Job = {
    title:      '',
    description: '',
    skills: '',
  }

  constructor(
    private jobService: JobService,
    private toastService:    ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.job.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.jobService.findById(this.job.id).subscribe(resposta => {
      this.job = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

}
