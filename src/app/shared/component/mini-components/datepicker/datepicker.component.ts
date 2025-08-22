import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-datepicker',
  imports: [ReactiveFormsModule, DatePickerModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css',
})
export class DatepickerComponent {
  @Input() control!: FormControl;
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
}
