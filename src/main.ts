import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { DatabaseInterceptor } from './app/core/interceptor/database.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { NoopAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, BrowserModule,),provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([DatabaseInterceptor])),
  ],
}).catch((err) => console.error(err));
