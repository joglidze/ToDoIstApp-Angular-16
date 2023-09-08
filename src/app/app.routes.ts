import { Routes } from '@angular/router';
import { auth, authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [auth],
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
  },

  {
    path: 'app',
    canActivate: [authGuard],
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
      {
        path: 'project/:projectName',
        loadComponent: () =>
          import('./components/project-page/project-page.component').then(
            (m) => m.ProjectPageComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
