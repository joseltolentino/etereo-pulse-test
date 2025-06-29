import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldConfig } from '../../../core/interfaces/form-field.interface';

@Component({
  selector: 'app-form-field-wrapper',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-field p-fluid">
      <label [for]="fieldConfig.name">{{ fieldConfig.label }}:</label>
      <ng-container #fieldContent></ng-container>
      <small class="p-error" *ngIf="control.invalid && control.touched">
        <span *ngIf="control.errors?.['required']"
          >Este campo es requerido.</span
        >
        <span *ngIf="control.errors?.['email']">Debe ser un email válido.</span>
        <span *ngIf="control.errors?.['minlength']"
          >Mínimo
          {{ control.errors?.['minlength'].requiredLength }} caracteres.</span
        >
      </small>
    </div>
  `,
  styleUrl: './form-field-wrapper.component.css',
})
export class FormFieldWrapperComponent implements AfterViewInit {
  @Input() fieldConfig!: FormFieldConfig;
  @Input() control!: FormControl;
  @Input() primeNgComponentRef!: ComponentRef<any>; // La instancia del ComponentRef del componente PrimeNG

  @ViewChild('fieldContent', { read: ViewContainerRef, static: true })
  fieldContentContainer!: ViewContainerRef;

  ngAfterViewInit(): void {
    if (
      this.primeNgComponentRef &&
      this.primeNgComponentRef.location &&
      this.primeNgComponentRef.location.nativeElement
    ) {
      // Mueve el elemento nativo del componente PrimeNG al contenedor del wrapper
      this.fieldContentContainer.element.nativeElement.appendChild(
        this.primeNgComponentRef.location.nativeElement
      );
      // Asegúrate de que el componente PrimeNG se vincule al FormControl
      (this.primeNgComponentRef.instance as any).formControl = this.control;
      (this.primeNgComponentRef.instance as any).formControlName =
        this.fieldConfig.name; // Por si lo usa
      // Otros ajustes específicos si el PrimeNG no se vincula 100% automático

      console.log(
        `[FormFieldWrapper] Componente PrimeNG adjuntado para ${this.fieldConfig.name}.`
      );
    } else {
      console.warn(
        `[FormFieldWrapper] No se recibió una referencia de componente PrimeNG válida para ${this.fieldConfig.name} o su nativeElement no está disponible.`
      );
    }
  }
}
