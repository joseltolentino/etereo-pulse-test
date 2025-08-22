// src/app/features/patients/patient.routes.ts

import { Routes } from '@angular/router';
import { PatientListComponent } from './components/patient-list/patient-list.component';

export const PATIENT_ROUTES: Routes = [
  {
    path: '', // Cuando se navega a '/pacientes' (el padre)
    component: PatientListComponent, // Carga el componente de lista por defecto
    pathMatch: 'full',
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./components/patient-detail/patient-detail.component').then(
        (m) => m.PatientDetailComponent
      ),
  },
];
