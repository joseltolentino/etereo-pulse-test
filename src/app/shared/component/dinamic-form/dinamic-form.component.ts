/* import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  TemplateRef,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormConfig } from '../../../core/interfaces/form-config.interface';
import { CommonModule } from '@angular/common';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AutoComplete, AutoCompleteModule } from 'primeng/autocomplete';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { RadioButton, RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';

const FIELD_COMPONENT_MAP: Record<string, any> = {
  text: InputText,
  number: InputText, 
  email: InputText,
  textarea: InputText,
  date: DatePicker,
  select: AutoComplete,
  checkbox: Checkbox,
  radio: RadioButton,
};

@Component({
  standalone: true,
  selector: 'app-dinamic-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    DatePickerModule,
    TextareaModule,
    CheckboxModule,
    RadioButtonModule,
    CardModule,
  ],
  templateUrl: './dinamic-form.component.html',
  styleUrl: './dinamic-form.component.css',
})
export class DinamicFormComponent implements AfterViewInit {
  @Input() formConfig!: FormConfig;
  @Input() formGroup!: FormGroup; 
  @Output() formSubmit = new EventEmitter<any>();

  constructor() {}
  @ViewChild('labelTemplate', { read: TemplateRef, static: true })
  labelTemplate!: TemplateRef<any>;

  @ViewChild('fieldHost', { read: ViewContainerRef, static: true })
  host!: ViewContainerRef;

  ngAfterViewInit() {
    
    this.host.clear();

    this.formConfig.fields.forEach((field) => {
      // 1) Label
      this.host.createEmbeddedView(this.labelTemplate, { $implicit: field });

      // 2) Campo
      const cmpType = FIELD_COMPONENT_MAP[field.type] || InputText;
      const compRef = this.host.createComponent(cmpType);
      compRef.setInput('formControlName', field.name);
      compRef.setInput('placeholder', field.placeholder || '');
      if (['text', 'email', 'number'].includes(field.type)) {
        compRef.setInput('type', field.type);
      }
      if (field.options) {
        compRef.setInput('options', field.options);
        compRef.setInput('optionLabel', 'label');
        compRef.setInput('optionValue', 'value');
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) this.formSubmit.emit(this.formGroup.value);
    else this.formGroup.markAllAsTouched();
  }
} */

/*  ngOnChanges(changes: SimpleChanges): void {
   
    if (changes['formGroup'] && this.formGroup) {
      console.log(
        'FormGroup actualizado en el componente dinámico:',
        this.formGroup
      );
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    } else {
      
      this.formGroup.markAllAsTouched();
      console.error('Formulario inválido', this.formGroup);
    }
  } */
// src/app/shared/components/dynamic-form/dynamic-form.component.ts
// src/app/shared/components/dynamic-form/dynamic-form.component.ts

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
  ViewChild,
  ComponentRef,
  OnDestroy,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

// Importa tus interfaces de configuración de formulario
import { FormConfig } from '../../../core/interfaces/form-config.interface';
import { FormFieldConfig } from '../../../core/interfaces/form-field.interface';
// Importa las CLASES de los componentes de PrimeNG (estas NO CAMBIAN)
import { InputText } from 'primeng/inputtext';
import { Calendar } from 'primeng/calendar';
import { Dropdown } from 'primeng/dropdown';

import { Checkbox } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';

// Importa tu componente FormFieldWrapper
import { FormFieldWrapperComponent } from '../form-field-wrapper/form-field-wrapper.component';

// ¡IMPORTA TODOS LOS MÓDULOS DE PRIMENG DE FORMA ESTÁTICA AQUÍ!
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  // --- ¡CAMBIO CRUCIAL AQUÍ: IMPORTS ESTÁTICOS! ---
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // PrimeNG Modules (importados estáticamente)
    CardModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,

    CheckboxModule,
    RadioButtonModule,

    // Tu componente wrapper
    FormFieldWrapperComponent,
  ],
  // ---------------------------------------------
  template: `
    <p-card [header]="formConfig.title" styleClass="dynamic-form-card">
      <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
        <ng-container #formFieldsContainer></ng-container>

        <p-button
          type="submit"
          [label]="formConfig.submitButtonText"
          [disabled]="formGroup.invalid"
          icon="pi pi-check"
          iconPos="right"
          styleClass="p-mt-3"
        ></p-button>
      </form>
    </p-card>
  `,
  styleUrls: ['./dinamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() formConfig!: FormConfig;
  @Input() formGroup!: FormGroup;
  @Output() formSubmit = new EventEmitter<any>();

  @ViewChild('formFieldsContainer', { read: ViewContainerRef, static: true })
  formFieldsContainer!: ViewContainerRef;

  private componentMap: { [key: string]: any } = {
    InputText: InputText,
    Calendar: Calendar,
    Dropdown: Dropdown,

    Checkbox: Checkbox,
    RadioButton: RadioButton,
    // Añade aquí cualquier otro componente PrimeNG que uses
  };

  private createdPrimeNgComponents: { [key: string]: ComponentRef<any> } = {};
  private subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    if (this.formConfig && this.formGroup) {
      this.renderFormFields();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['formConfig'] || changes['formGroup']) &&
      this.formConfig &&
      this.formGroup
    ) {
      this.renderFormFields();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.formFieldsContainer.clear();
  }

  private renderFormFields(): void {
    this.formFieldsContainer.clear();
    this.createdPrimeNgComponents = {};
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];

    this.formConfig.fields.forEach((field) => {
      const componentClass = field.primeNgComponentName
        ? this.componentMap[field.primeNgComponentName]
        : null;

      if (!componentClass) {
        console.warn(
          `[DynamicFormComponent]: Component class not found for name: ${field.primeNgComponentName}. Skipping field: ${field.name}.`
        );
        return;
      }

      const control = this.formGroup.get(field.name) as FormControl;
      if (!control) {
        console.error(
          `[DynamicForm]: FormControl for '${field.name}' not found in FormGroup. Check your DTO and FormService.`
        );
        return;
      }
      try {
        // --- ¡VOLVEMOS A INTENTAR createComponent DIRECTAMENTE! ---
        // El problema del `Compiler` era el deprecado.
        // Si sigue fallando aquí, la clave es qué *exactamente* se importa como InputText.
        const primeNgComponentRef: ComponentRef<any> =
          // ... (resto del código para configurar la instancia y el wrapper) ...
          this.formFieldsContainer.createComponent(componentClass);
        this.createdPrimeNgComponents[field.name] = primeNgComponentRef;
        const primeNgInstance: any = primeNgComponentRef.instance;

        primeNgInstance.formControlName = field.name;

        if (field.primeNgProps) {
          for (const prop in field.primeNgProps) {
            if (
              Object.prototype.hasOwnProperty.call(field.primeNgProps, prop)
            ) {
              primeNgInstance[prop] = field.primeNgProps[prop];
            }
          }
        }

        const wrapperRef: ComponentRef<FormFieldWrapperComponent> =
          this.formFieldsContainer.createComponent(FormFieldWrapperComponent);
        const wrapperInstance: FormFieldWrapperComponent = wrapperRef.instance;

        wrapperInstance.fieldConfig = field;
        wrapperInstance.control = control;
        wrapperInstance.primeNgComponentRef = primeNgComponentRef;
        console.log(
          `[DynamicForm] Wrapper para "${field.name}" creado y configurado.`
        );
      } catch (e) {
        console.error(
          `[DynamicForm FATAL ERROR]: Fallo al crear o configurar el componente para el campo "${field.name}". Error:`,
          e
        );
        console.error(
          'Esto todavía sugiere que la CLASE del componente PrimeNG que se está pasando no tiene el decorador @Component reconocido en el contexto de AOT.'
        );
        // Una táctica de depuración aquí sería:
        // console.log("Tipo de componentClass:", typeof componentClass);
        // console.log("Es constructible?", componentClass.prototype instanceof Component); // Esto no siempre funciona como quisiéramos para depurar el @Component
        // console.log("Metadata de Angular (si existe):", (componentClass as any).__annotations__);
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
      console.error(
        'Formulario inválido',
        this.formGroup.value,
        this.formGroup.controls
      );
    }
  }
}
