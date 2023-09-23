import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const cookie = inject(CookieService);
  const token = cookie.get('token');

  if (token && token !== '') return true;
  return router.createUrlTree(['auth']);
};
