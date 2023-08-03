import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { auth, authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    // canActivate: [auth],
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'app',
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/main-app/main-app.component').then(
        (m) => m.MainAppComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
