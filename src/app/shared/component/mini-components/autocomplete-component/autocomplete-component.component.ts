import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from '../../../../core/interfaces/form-config';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-autocomplete-component',
  imports: [ReactiveFormsModule, AutoCompleteModule],
  templateUrl: './autocomplete-component.component.html',
  styleUrl: './autocomplete-component.component.css'
})
export class AutocompleteComponentComponent {
  @Input() control!: FormControl;
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() options: SelectItem[] = [];

  filteredOptions: SelectItem[] = [];

  filter(event: any) {
    const query = event.query.toLowerCase();
    this.filteredOptions = this.options.filter(item =>
      item.label.toLowerCase().includes(query)
    );
  }
}
