import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { LoginIn } from './core/interfaces/logIn';
import { DatabaseInterceptor } from './core/interceptor/database.interceptor';

let user: any = localStorage.getItem('user');

let token: any = JSON.parse(user);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations()],
};
