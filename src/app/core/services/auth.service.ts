import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SignUp } from '../interfaces/signup';
import { LoginIn } from '../interfaces/logIn';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(email: string, password: string, name: string): Observable<SignUp> {
    return this.http.post<SignUp>(environment.apiSignUp + environment.apiKey, {
      email: email,
      password: password,
      displayName: name,
      returnSecureToken: true,
    });
  }

  loginIn(email: string, password: string): Observable<LoginIn> {
    return this.http.post<LoginIn>(environment.apiSignIn + environment.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }

  logOut() {
    return localStorage.clear();
  }
}
