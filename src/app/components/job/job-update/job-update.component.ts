import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.css']
})
export class JobUpdateComponent implements OnInit {

  job: Job = {
    title:      '',
    description: '',
    skills: '',
  }

  title:FormControl = new FormControl(null);
  description:FormControl = new FormControl(null);
  skills:FormControl = new FormControl(null);

  constructor(
    private jobService: JobService,
    private toastService:    ToastrService,
    private router: Router,
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

  update(): void {
    this.jobService.update(this.job).subscribe(resposta => {
      this.toastService.success('Vaga atualizada com sucesso', 'Atualizar vaga');
      this.router.navigate(['jobs']);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

}
