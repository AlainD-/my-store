import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SESSION_TOKEN } from '../constants/config.constants';
import { NO_HTTP_STATUS, ERROR_UNAUTHORIZED } from '../constants/error-codes.constants';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* <JWT> */
    const headerName = 'Authorization';
    const token = localStorage.getItem(SESSION_TOKEN);
    if (token) {
      request = request.clone({ headers: request.headers.set(headerName, `Bearer ${token}`) });
    }
    /* </JWT> */

    return next.handle(request).pipe(
      tap({
        error: async (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === NO_HTTP_STATUS) {
              const message =
                'The communication with the server cannot be established, ' +
                'or the server does not seems to be alive. ' +
                'If the problem persists, please contact the support of the application.';
              this.notificationService.notifyErrorWithMessage(message);
            } else if (error.status === ERROR_UNAUTHORIZED) {
              this.notificationService.notifyWarning('Your session has timed out.');
              this.authenticationService.logout();
              await this.router.navigate(['/']);
            } else {
              this.notificationService.notifyError(error);
            }
          }
        },
      })
    );
  }
}
