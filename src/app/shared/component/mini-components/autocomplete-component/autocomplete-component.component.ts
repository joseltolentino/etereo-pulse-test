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
  @Input() filterFunction!: (query: string) => void;
  @Input() suggestions!: Signal<any[]>;
  @Input() displayWith!: (item: any) => string;
  @Input() optionLabel!: string; // Función para mostrar texto en input y dropdown

  filter(event: any) {
    if (this.filterFunction) {
      this.filterFunction(event.query);
    }
  }
}
