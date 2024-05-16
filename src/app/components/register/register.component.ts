import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name = new FormControl('', Validators.required);
  email = new FormControl('', Validators.email);
  password = new FormControl('', Validators.minLength(3));
  admin = false;

  constructor(
    private toast: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  toggleAdmin(checked: boolean) {
    this.admin = checked;
  }

  register() {
    if (this.name.valid && this.email.valid && this.password.valid) {
      const name = this.name.value;
      const email = this.email.value;
      const password = this.password.value;
      const admin = this.admin;

      this.authService.register(name, email, password, admin).subscribe(() => {
        this.router.navigate(['/login']);
        this.toast.success('Registro realizado com sucesso');
      }, (error) => {
        console.error('Erro durante o registro:', error);
        this.toast.error('Erro ao registrar, tente novamente mais tarde');
      });
    } else {
      this.toast.error('Por favor, preencha todos os campos corretamente');
    }
  }

  validaCampos(): boolean {
    return this.name.valid && this.email.valid && this.password.valid;
  }
}
