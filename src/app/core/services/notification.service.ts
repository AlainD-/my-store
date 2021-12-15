import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import {
  ERROR_NOT_FOUND,
  NO_HTTP_STATUS,
  NULL_HTTP_STATUS,
} from '../constants/error-codes.constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private error: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  readonly error$ = this.error.asObservable();

  constructor(private messageService: MessageService) {}

  getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case NO_HTTP_STATUS:
        case NULL_HTTP_STATUS:
          return 'No response has been received from the server. Please make sure that the server is alive.';
        case ERROR_NOT_FOUND:
          return 'The requested resource was not found. Please make sure that the action performed is available, or try again.';
        default:
          if (typeof error.error === 'string') {
            return error.error;
          }
          if (typeof error.error === 'object' && error.error !== null) {
            const obj: { message?: string } = error.error as { message?: string };
            if (
              Object.prototype.hasOwnProperty.call(obj, 'message') &&
              typeof obj.message === 'string'
            ) {
              return obj.message;
            }
            return 'An unexpected error occurred';
          }
          return 'An unexpected error occurred';
      }
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred';
  }

  notifyError(error: unknown): void {
    if (
      error instanceof HttpErrorResponse &&
      (error.status === NO_HTTP_STATUS || error.status === NULL_HTTP_STATUS)
    ) {
      this.error.next(
        'No response has been received from the server. Please make sure that the server is alive.'
      );
    } else {
      this.error.next(this.getErrorMessage(error));
    }
  }

  notifyErrorWithMessage(message: string): void {
    this.error.next(message);
  }

  notifySuccess(message: string, summary?: string): void {
    this.notifyToast(message, 'success', summary);
  }

  private notifyToast(detail: string, severity: string, summary?: string): void {
    const key = 'notificationToast';
    this.messageService.add({ key, severity, summary, detail });
  }

  notifyWarning(message: string, summary?: string): void {
    this.notifyToast(message, 'warn', summary);
  }

  resetError(): void {
    this.error.next(null);
  }
}
