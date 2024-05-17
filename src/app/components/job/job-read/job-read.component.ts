import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/models/job';
import { Subscription } from 'src/app/models/subscription';
import { JobService } from 'src/app/services/job.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

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

  subscriptions: Subscription[] = [];


  constructor(
    private jobService: JobService,
    private subscriptionService: SubscriptionService,
    private toastService:    ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.job.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.loadSubscriptions();
  }


  findById(): void {
    this.jobService.findById(this.job.id).subscribe(resposta => {
      this.job = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  loadSubscriptions() {
    this.jobService.findById(this.job.id).subscribe(job => {
      this.job = job;

      this.subscriptionService.findAll().subscribe(subs => {
        this.subscriptions = subs.filter(sub => sub.jobTitle === this.job.title);
      });
    }, ex => {
      this.toastService.error(ex.error.error);
    });
  }



}
