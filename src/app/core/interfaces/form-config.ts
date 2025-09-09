// models/form-config.model.ts
export interface SelectItem {
  value: string;
  label: string;
}

export interface Propiedad {
  columnName: string;
  label: string;
  type?: string;
  inputType:
    | 'text'
    | 'select'
    | 'autocomplete'
    | 'password'
    | 'date'
    | 'textarea'
    | 'checkbox';
  isReadOnly?: boolean;
  placeholder: string;
  maxLength: number | null;
  minLength: number;
  isNullable: boolean;
  selectItems?: { value: string; label: string }[] | null;
  validaciones?: string[];
  searchKey?: string;
  displayWith: (value: any) => string;
  optionLabel: string;
}

export interface FormConfig {
  nombreEntidad: string;
  propiedades: Propiedad[];
}
