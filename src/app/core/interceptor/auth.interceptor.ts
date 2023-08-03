import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpErrorResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   static addToken(
//     request: HttpRequest<unknown>,
//     token: string
//   ): HttpRequest<unknown> {
//     return request.clone({
//       params: new HttpParams().set('auth', token),
//     });
//   }

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     const token = localStorage.getItem(JSON.parse('user'));
//     if (!token) {
//       return next.handle(request);
//     }
//     return next.handle(AuthInterceptor.addToken(request, token));
//   }
// }

export function ApiKeyInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const user: any = localStorage.getItem('user');
  const token = JSON.parse(user);
  console.log(token.idToken);
  return next(
    req.clone({
      params: new HttpParams().set('auth', JSON.stringify(token.localId)),
    })
  );
}
