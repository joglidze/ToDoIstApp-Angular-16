import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SignUp } from '../interfaces/signup';
import { LoginIn} from '../interfaces/logIn';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(email: string, password: string, name: string):Observable<SignUp> {
    return this.http.post<SignUp>(environment.apiUrl, {
      email: email,
      password: password,
      displayName: name,
      returnSecureToken: true,
    });
  }

  loginIn(email: string, password: string):Observable<LoginIn> {
    return this.http.post<LoginIn>(
      ' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0K4EXj_VH-jRGO-M7JE--U6nSA2yBRwc',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
