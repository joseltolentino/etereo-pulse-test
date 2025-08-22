import { Component, Input, Signal, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from '../../../../core/interfaces/form-config';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-autocomplete-component',
  imports: [ReactiveFormsModule, AutoCompleteModule],
  templateUrl: './autocomplete-component.component.html',
  styleUrl: './autocomplete-component.component.css',
})
export class AutocompleteComponentComponent {
  @Input() control!: FormControl;
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() options: SelectItem[] = [];
  @Input() filterFunction!: (query: string) => void;
  @Input() suggestions!: Signal<any[]>;

  filteredOptions: SelectItem[] = [];

  /*   filter(event: any) {
    const query = event.query.toLowerCase();
    this.filteredOptions = this.options.filter(item =>
      item.label.toLowerCase().includes(query)
    );
  } */
  ngOnChanges(changes: SimpleChanges) {
    // Cuando cambian las opciones (señal del padre), actualiza la lista
    if (changes['options'] && changes['options'].currentValue) {
      this.filteredOptions = changes['options'].currentValue;
    }
  }

  filter(event: any) {
    if (this.filterFunction) {
      this.filterFunction(event.query);
    }
  }
}
