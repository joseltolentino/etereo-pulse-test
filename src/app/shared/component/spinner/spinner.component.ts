import { Component } from '@angular/core';

import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-spinner',
  imports: [ProgressSpinner],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {}
