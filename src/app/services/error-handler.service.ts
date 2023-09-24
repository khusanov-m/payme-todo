import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private _toastr: ToastrService) {}

  public handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Unknown error occurred';

    if (error.error.message) {
      message = error.error.message;
    }

    this._toastr.error(message);
    return throwError(() => new Error(error.message));
  }
}
