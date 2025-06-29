// models/form-config.model.ts
export interface SelectItem {
  value: string;
  label: string;
}

export interface Propiedad {
  columnName: string;
  label: string;
  inputType: string;
  placeholder: string;
  maxLength: number | null;
  isNullable: boolean;
  selectItems: SelectItem[] | null;
  validaciones: string[];
}

export interface FormConfig {
  nombreEntidad: string;
  propiedades: Propiedad[];
}