import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-textarea',
  imports: [ReactiveFormsModule, TextareaModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css',
})
export class TextareaComponent {
  @Input() control!: FormControl;
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
}
