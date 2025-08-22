import { Routes } from '@angular/router';
import { AppointmentsFormComponent } from './components/appointments-form/appointments-form.component';

export const APPOINTMENT_ROUTES: Routes = [
  {
    path: '',
    component: AppointmentsFormComponent,
    pathMatch: 'full',
  },
];
