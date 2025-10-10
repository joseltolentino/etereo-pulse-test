import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-select-button',
  imports: [CommonModule, SelectButtonModule, ReactiveFormsModule],
  templateUrl: './select-button.component.html',
  styleUrl: './select-button.component.css',
})
export class SelectButtonComponent {
  /**
   * Nombre del campo (para debug o identificación)
   */
  @Input() name!: string;

  /**
   * Control reactivo del formulario principal
   */
  @Input() control!: FormControl;

  /**
   * Lista de opciones del botón select
   * Ejemplo: [{ label: '9:00 a.m.', value: '09:00' }]
   */
  @Input() options: any[] = [];

  /**
   * Etiqueta que se mostrará arriba del grupo de botones
   */
  @Input() label = '';

  /**
   * Emite el valor seleccionado hacia el formulario padre o el DynamicFormComponent
   */
  @Output() valueChange = new EventEmitter<any>();

  onChangeValue(event: any) {
    this.valueChange.emit(event.value);
  }
}
