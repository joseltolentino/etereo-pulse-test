import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from '../../../../core/interfaces/form-config';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-select-component',
  imports: [ReactiveFormsModule, SelectModule],
  templateUrl: './select-component.component.html',
  styleUrl: './select-component.component.css'
})
export class SelectComponentComponent {
  @Input() control!: FormControl;
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() options: SelectItem[] = [];
}
