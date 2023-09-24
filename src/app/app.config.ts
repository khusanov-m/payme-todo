import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { TodosEffects } from './features/todo/store/todos.effects';
import { reducers } from './features/todo/store/todos.store';
import { authInterceptor } from './services/auth-interceptor.service';
import { RouteTitleConfig } from './services/page-title.service';

const maskConfig: Partial<IConfig> = {};

const ToastrConfigConst = {
  preventDuplicates: true,
  extendedTimeOut: 5000,
  resetTimeoutOnDuplicate: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    provideEnvironmentNgxMask(maskConfig),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideToastr(ToastrConfigConst),
    RouteTitleConfig,
    provideStore(reducers),
    provideEffects([TodosEffects]),
  ],
};
