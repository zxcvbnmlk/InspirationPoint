import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          console.warn('Unauthorized');
        }

        if (error.status === 403) {
          console.warn('Forbidden');
        }

        if (error.status === 500) {
          console.error('Server error');
        }

        return throwError(() => error);
      })
    );
  }
}
