import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _cookie = inject(CookieService);

  if (_cookie.check('token')) {
    const headers = req.headers.set(
      'Authorization',
      `Token ${_cookie.get('token')}`
    );

    req = req.clone({
      headers,
    });
  }

  return next(req).pipe(tap(res => console.log('response', res)));
};
