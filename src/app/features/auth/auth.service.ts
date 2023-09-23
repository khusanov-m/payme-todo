import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _http: HttpService,
    private _cookie: CookieService
  ) {}

  login(): void {
    console.log('login');
  }
}
