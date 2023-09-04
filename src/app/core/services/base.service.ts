import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  apiUrl: string = 'https://todoistapp-94808-default-rtdb.firebaseio.com/';

  http: HttpClient = inject(HttpClient);

  get<T>(url: string, params = {}): Observable<T> {
    return this.http.get<T>(this.apiUrl + url, { params: params });
  }

  post<T>(url: string, data?: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, data);
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + url, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.apiUrl + url);
  }
}
