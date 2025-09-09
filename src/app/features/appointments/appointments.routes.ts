import { Routes } from '@angular/router';

import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';

export const APPOINTMENT_ROUTES: Routes = [
  {
    path: '',
    component: AppointmentsListComponent,
    pathMatch: 'full',
  },
  {
    path: 'appointmentForm',
    loadComponent: () =>
      import('./components/appointments-form/appointments-form.component').then(
        (m) => m.AppointmentsFormComponent
      ),
  },
];
