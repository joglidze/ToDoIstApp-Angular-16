import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
 
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./pages/main-app/main-app.component').then(
        (m) => m.MainAppComponent
      ),
  },
];
