// src/app/app.routes.ts  (o app-routing.module.ts)
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pacientes/nuevo',
    loadComponent: () =>
      import(
        './features/patients/components/patient-form/patient-form.component'
      ).then((m) => m.PatientFormComponent),
  },
  {
    path: '',
    redirectTo: 'pacientes/nuevo',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'pacientes/nuevo',
  },
];
