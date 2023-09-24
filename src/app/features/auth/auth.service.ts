import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable, take, tap } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LoginRequest, LoginResponse } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _http: HttpService,
    private _cookie: CookieService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this._http
      .post<LoginResponse, LoginRequest>('/auth/token/login/', data)
      .pipe(
        take(1),
        tap(data => this.handleAuth(data))
      );
  }

  handleAuth(data: LoginResponse): void {
    this._cookie.set('token', data.token);
    this._cookie.set('username', data.username);
    this._cookie.set('user_id', data.user_id);
  }

  autoLogin(): void {
    if (this._cookie.check('token') && this._cookie.get('token') !== '') {
      if (sessionStorage.getItem('welcome') !== 'true') {
        this._toastr.success(`Welcome back ${this._cookie.get('username')}!`);
        sessionStorage.setItem('welcome', 'true');
      }
    } else {
      this._router.navigate(['/auth']);
    }
  }
}
