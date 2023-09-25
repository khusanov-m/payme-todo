import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  public handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Unknown error occurred';

    if (error.error?.message) {
      message = error.error.message;
    }

    if (error.error?.detail) {
      message = error.error.detail;
    }

    return throwError(() => new Error(message));
  }
}
