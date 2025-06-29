// src/app/core/services/form.service.ts
/* import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormConfig } from '../interfaces/form-config.interface';
import { FormFieldConfig } from '../interfaces/form-field.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  generateFormAndConfig<T extends object>(
    dtoExample: T,
    title: string = 'Formulario Dinámico',
    initialData?: Partial<T>
  ): { formConfig: FormConfig; formGroup: FormGroup } {
    const formConfig: FormConfig = {
      title: title,
      fields: [],
      submitButtonText: 'Guardar',
    };

    const formGroupControls: { [key: string]: FormControl } = {};

    for (const key in dtoExample) {
      if (Object.prototype.hasOwnProperty.call(dtoExample, key)) {
        const value = initialData ? initialData[key] : (dtoExample as any)[key];

        let type: FormFieldConfig['type'] = 'text';
        let validators: any[] = [];

        if (typeof value === 'number') {
          type = 'number';
        } else if (key.toLowerCase().includes('email')) {
          type = 'email';
          validators.push(Validators.email);
        } else if (key.toLowerCase().includes('fecha')) {
          type = 'date';
        } else if (key.toLowerCase().includes('genero')) {
          type = 'select';
        }

        validators.push(Validators.required);

        const fieldConfig: FormFieldConfig = {
          name: key,
          label: this.capitalizeFirstLetter(key),
          type: type,
          value: value,
          validators: ['required'],
        };

        if (key.toLowerCase().includes('genero')) {
          fieldConfig.options = [
            { label: 'Masculino', value: 'masculino' },
            { label: 'Femenino', value: 'femenino' },
            { label: 'Otro', value: 'otro' },
          ];
        }

        formConfig.fields.push(fieldConfig);
        formGroupControls[key] = new FormControl(value, validators);
      }
    }

    return {
      formConfig: formConfig,
      formGroup: new FormGroup(formGroupControls),
    };
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
} */
// src/app/core/services/form.service.ts
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormConfig } from '../interfaces/form-config.interface';
import { FormFieldConfig } from '../interfaces/form-field.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  generateFormAndConfig<T extends object>(
    dtoExample: T,
    title: string = 'Formulario Dinámico',
    initialData?: Partial<T>
  ): { formConfig: FormConfig; formGroup: FormGroup } {
    const formConfig: FormConfig = {
      title: title,
      fields: [],
      submitButtonText: 'Guardar',
    };
    const formGroupControls: { [key: string]: FormControl } = {};

    for (const key in dtoExample) {
      if (Object.prototype.hasOwnProperty.call(dtoExample, key)) {
        const value = initialData
          ? (initialData as any)[key]
          : (dtoExample as any)[key];
        let type: FormFieldConfig['type'] = 'text';
        let validators: any[] = [];
        let primeNgComponentName: string = ''; // Aquí asignaremos el componente
        let primeNgProps: { [key: string]: any } = {}; // Aquí propiedades específicas de PrimeNG

        // Lógica para inferir tipo, validadores, componente PrimeNG y sus props
        if (typeof value === 'number') {
          type = 'number';
          primeNgComponentName = 'InputText'; // Para números, usar pInputText
          primeNgProps['type'] = 'number';
        } else if (key.toLowerCase().includes('email')) {
          type = 'email';
          validators.push(Validators.email);
          primeNgComponentName = 'InputText';
          primeNgProps['type'] = 'email';
        } else if (key.toLowerCase().includes('fecha')) {
          type = 'date';
          primeNgComponentName = 'Calendar';
          primeNgProps['dateFormat'] = 'dd/mm/yy';
          primeNgProps['showIcon'] = true;
        } else if (
          key.toLowerCase().includes('genero') ||
          key.toLowerCase().includes('estado')
        ) {
          type = 'select';
          primeNgComponentName = 'Dropdown';
          primeNgProps['optionLabel'] = 'label';
          primeNgProps['optionValue'] = 'value';
          primeNgProps['showClear'] = true;
        } else if (typeof value === 'boolean') {
          type = 'checkbox';
          primeNgComponentName = 'Checkbox';
          primeNgProps['binary'] = true; // Checkbox de PrimeNG para valor booleano
        } else if (
          key.toLowerCase().includes('descripcion') ||
          key.toLowerCase().includes('notas')
        ) {
          type = 'textarea';
          primeNgComponentName = 'InputTextarea';
          primeNgProps['rows'] = 3;
        } else {
          // Por defecto
          primeNgComponentName = 'InputText';
          primeNgProps['type'] = 'text';
        }

        if (key !== 'id') {
          validators.push(Validators.required);
        }

        const fieldConfig: FormFieldConfig = {
          name: key,
          label: this.capitalizeFirstLetter(key),
          type: type,
          value: value,
          validators: validators.map((v) => this.getValidatorName(v)),
          primeNgComponentName: primeNgComponentName, // Asigna el componente
          primeNgProps: primeNgProps, // Asigna las propiedades
        };

        if (type === 'select') {
          if (key.toLowerCase().includes('genero')) {
            fieldConfig.options = [
              { label: 'Masculino', value: 'masculino' },
              { label: 'Femenino', value: 'femenino' },
              { label: 'Otro', value: 'otro' },
            ];
            fieldConfig.placeholder = 'Selecciona un género';
          }
        }

        formConfig.fields.push(fieldConfig);
        formGroupControls[key] = new FormControl(value, validators);
      }
    }

    const formGroup = new FormGroup(formGroupControls);
    return { formConfig, formGroup };
  }

  private capitalizeFirstLetter(inputString: string): string {
    if (!inputString) return '';
    const formatted = inputString.replace(/([A-Z])/g, ' $1');
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  private getValidatorName(validator: any): string {
    if (validator === Validators.required) return 'required';
    if (validator === Validators.email) return 'email';
    return 'custom';
  }
}
