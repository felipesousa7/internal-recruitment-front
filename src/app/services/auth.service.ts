import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from '../config/api.config';
import { credenciais } from '../models/credenciais';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(creds: credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, creds, {
      observe: 'response',
      responseType: 'json'
    }).pipe(
      tap((response: HttpResponse<any>) => {
        console.log('Response:', response);
        if (response.body && response.body.token) {
          const authToken = response.body.token;
          this.successfulLogin(authToken);
        }
      })
    );
  }
  register(name: string, email: string, password: string, admin: boolean) {
    const body = { name, email, password, admin };
    return this.http.post(`${API_CONFIG.baseUrl}/auth/register`, body, {
      observe: 'response',
      responseType: 'json'
    }).pipe(
      tap((response) => {
        console.log('Registration Response:', response);
      })
    );
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if(token !=  null) {
       return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }

}
