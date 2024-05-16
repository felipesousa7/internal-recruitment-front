import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  creds: credenciais = {
    email: '',
    password: ''
  }

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void { }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      const token = resposta.body.token; // Extrai o token do corpo da resposta
      this.service.successfulLogin(token); // Salva o token no localStorage
      this.router.navigate(['/home']); // Navega para a página home
    }, () => {
      this.toast.error('Usuário e/ou senha inválidos');
    });
  }

  validaCampos(): boolean {
    return this.email.valid && this.password.valid
  }
}
