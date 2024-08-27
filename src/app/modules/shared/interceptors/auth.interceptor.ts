import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  catchError,
  tap,
  throwError
} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            console.log("401 Error Catched")
            this.router.navigateByUrl('/auth/login');
          }
        }
      )
    );

  }

}
