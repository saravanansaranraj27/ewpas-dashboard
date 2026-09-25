import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'monitor',
    loadComponent: () =>
      import('./features/monitor/monitor.component').then(
        (m) => m.MonitorComponent,
      ),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./features/analytics/analytics.component').then(
        (m) => m.AnalyticsComponent,
      ),
  },
  {
    path: 'compliance',
    loadComponent: () =>
      import('./features/compliance/compliance.component').then(
        (m) => m.ComplianceComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
