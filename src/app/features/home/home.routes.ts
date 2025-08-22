import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home-view/home-view.component').then(
        (m) => m.HomeViewComponent
      ),
  },
];
