import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'etereo-pulse-web';
}
