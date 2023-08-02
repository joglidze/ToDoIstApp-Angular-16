import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(email: string, password: string, name: string) {
    return this.http.post<any>(environment.apiUrl, {
      email: email,
      password: password,
      displayName: name,
      returnSecureToken: true,
    });
  }

  loginIn(email: string, password: string) {
    return this.http.post<any>(
      ' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0K4EXj_VH-jRGO-M7JE--U6nSA2yBRwc',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
