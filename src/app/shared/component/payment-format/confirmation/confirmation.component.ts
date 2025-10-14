import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-confirmation',
  imports: [CardModule, TextareaModule, ButtonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
})
export class ConfirmationComponent {
  @Input() data!: any;
  @Output() confirmed = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
}
