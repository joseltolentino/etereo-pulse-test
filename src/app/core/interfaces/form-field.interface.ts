// src/app/core/interfaces/form-field.interface.ts
export interface FormFieldConfig {
  name: string;
  label: string;
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'date'
    | 'select'
    | 'textarea'
    | 'checkbox'
    | 'radio';
  value?: any;
  validators?: string[]; // ej. ['required', 'minLength:5', 'email']
  options?: { label: string; value: string | number }[]; // Para tipo 'select'
  placeholder?: string;
  // Propiedad para el componente PrimeNG a usar (ej. InputTextComponent)

  primeNgComponentName?: string; // Referencia al tipo de componente PrimeNG
  // Propiedades específicas para PrimeNG
  primeNgProps?: { [key: string]: any }; // Para pasar propiedades como 'dateFormat', 'showIcon', 'binary', etc.
}
// Agrega más propiedades según sea necesario para mensajes de validación, estado deshabilitado, etc.
