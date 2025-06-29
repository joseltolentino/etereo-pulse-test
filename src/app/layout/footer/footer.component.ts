import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms'; // <-- Importa estos
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [ButtonModule, InputTextModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  subscriptionForm!: FormGroup; // Declara tu FormGroup
  subscriptionMessage: string = '';
}
