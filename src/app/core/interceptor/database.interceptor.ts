
import {
  HttpRequest,

  HttpHandlerFn,
} from '@angular/common/http';


// @Injectable()
// export class DatabaseInterceptor implements HttpInterceptor {
//   user: any = localStorage.getItem('user');
//   token = JSON.parse(this.user).idToken;
//   constructor() {}

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     const modifiedReq = request.clone({
//       params: new HttpParams().set('auth', JSON.parse(this.token)),
//     });
//     return next.handle(modifiedReq);
//   }
// }

export function DatabaseInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  let user: any = localStorage.getItem('user');
  let token: any = JSON.parse(user)?.idToken;

  if (token) {
    return next(
      req.clone({
        setParams: {
          auth: token,
        },
      })
    );
  }
  return next(req);
}
