import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { auth, authGuard } from './core/guard/auth.guard';
import { InboxComponent } from './components/inbox/inbox.component';

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
    children: [
      {
        path: 'inbox',
        loadComponent: () =>
          import('./components/inbox/inbox.component').then(
            (m) => m.InboxComponent
          ),
      },
      {
        path: 'today',
        loadComponent: () =>
          import('./components/today-section/today-section.component').then(
            (m) => m.TodaySectionComponent
          ),
      },
      {
        path: 'upcoming',
        loadComponent: () =>
          import('./components/upcoming/upcoming.component').then(
            (m) => m.UpcomingComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
