import { catchError } from 'rxjs/operators';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {

          // Handle Unauthorized Errors (Status: 401)
          if (error.status === 401) {
            return throwError(error.statusText);
          }

          // Handle NotFound Errors (Status: 404)
          if (error.status === 404) {
            return throwError(error.statusText);
          }

          // Handle Exceptions Errors (Status: 500)
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            console.error(applicationError);
            return throwError(applicationError);
          }

          // Handle Bad Request Errors (Status: 400)
          const serverError = error.error;
          let modalStateErrors = '';
          if (serverError) {
            if (typeof serverError.errors === 'object') {
              for (const key in serverError.errors) {
                if (serverError.errors[key]) {
                  serverError.errors[key].forEach((value: string) => {
                    modalStateErrors += `${value}\n`;
                  });
                }
              }
            }

            return throwError(modalStateErrors || serverError.errors || 'Server Error');
          }
        }
      })
    );
  }
}

export const errorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
