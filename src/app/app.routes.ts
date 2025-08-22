import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },

  {
    path: 'register',
    loadChildren: () =>
      import('./features/auth/components/register/register.routes').then(
        (m) => m.REGISTER_ROUTES
      ),
  },
  {
    path: '',
    redirectTo: 'login', // Redirige la raíz a la página de login inicialmente
    pathMatch: 'full',
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'patients', // Esta ruta sigue apuntando al archivo de rutas de la característica
        loadChildren: () =>
          import('./features/patients/patient.routes').then(
            (m) => m.PATIENT_ROUTES
          ), // Esta importación es correcta
      },
      {
        path: 'appointment',
        loadChildren: () =>
          import('./features/appointments/appointments.routes').then(
            (m) => m.APPOINTMENT_ROUTES
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
