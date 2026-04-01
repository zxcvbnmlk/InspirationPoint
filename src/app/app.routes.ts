import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/events/pages/events/events.component').then((m) => m.EventsComponent),
  },
  { path: '**', redirectTo: '/' },
];
