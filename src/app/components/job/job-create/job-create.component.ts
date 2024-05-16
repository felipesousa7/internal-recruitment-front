import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {

  job: Job = {
    title:      '',
    description: '',
    skills: '',
  }


  title:FormControl = new FormControl(null, [Validators.required]);
  description:FormControl = new FormControl(null, [Validators.required]);
  skills:FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private jobService: JobService,
    private toastService:    ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.jobService.create(this.job).subscribe(resposta => {
      this.toastService.success('Vaga criada com sucesso', 'Nova vaga');
      this.router.navigate(['jobs']);
    }, ex => {
      console.log(ex);

      this.toastService.error(ex.error.error);
    })
  }


  validaCampos(): boolean {
    return this.title.valid
       && this.description.valid && this.skills.valid
  }

}
