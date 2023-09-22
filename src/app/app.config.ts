import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { routes } from './app.routes';
import { authInterceptor } from './services/auth-interceptor.service';

const maskConfig: Partial<IConfig> = {};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    provideEnvironmentNgxMask(maskConfig),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
