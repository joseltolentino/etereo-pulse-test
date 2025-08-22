import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-password',
  imports: [ReactiveFormsModule, PasswordModule, InputTextModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css',
})
export class PasswordComponent {
  @Input() control!: FormControl;
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
}
