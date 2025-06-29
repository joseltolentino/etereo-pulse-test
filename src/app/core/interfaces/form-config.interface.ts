import { FormFieldConfig } from './form-field.interface';

export interface FormConfig {
  title: string;
  fields: FormFieldConfig[];
  submitButtonText?: string;
}
