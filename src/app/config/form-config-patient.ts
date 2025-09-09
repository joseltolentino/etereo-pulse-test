import { FormConfig } from '../core/interfaces/form-config';

export const patientFormConfig: FormConfig = {
  nombreEntidad: 'Paciente',
  propiedades: [
    {
      columnName: 'id',
      label: 'ID del Paciente',
      inputType: 'text', // Usamos text para mostrarlo
      placeholder: '',
      maxLength: 5,
      minLength: 2,
      isNullable: true,
      validaciones: [],
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'nombre', // debe coincidir con PatientDto
      label: 'Nombre',
      inputType: 'text',
      placeholder: 'Ingrese el nombre',
      maxLength: 50,
      minLength: 2,
      isNullable: false,
      validaciones: ['required'],
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'apellido',
      label: 'Apellido',
      inputType: 'text',
      placeholder: 'Ingrese el apellido',
      maxLength: 50,
      minLength: 2,
      isNullable: false,
      validaciones: ['required'],
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },

    {
      columnName: 'genero',
      label: 'Género',
      inputType: 'select',
      placeholder: 'Seleccione género',
      isNullable: false,
      minLength: 0,
      maxLength: 0,
      validaciones: [],
      selectItems: [
        { value: 'masculino', label: 'Masculino' },
        { value: 'femenino', label: 'Femenino' },
        { value: 'otro', label: 'Otro' },
      ],
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'direccion',
      label: 'Dirección',
      inputType: 'text',
      placeholder: 'Ingrese dirección',
      maxLength: 100,
      minLength: 5,
      isNullable: false,
      validaciones: [],
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'telefono',
      label: 'Teléfono',
      inputType: 'text',
      placeholder: 'Ingrese teléfono',
      maxLength: 15,
      minLength: 7,
      isNullable: false,
      validaciones: [],
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'email',
      label: 'Correo Electrónico',
      inputType: 'text',
      placeholder: 'ejemplo@mail.com',
      maxLength: 100,
      minLength: 5,
      isNullable: false,
      validaciones: ['email'],
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'fechaNacimiento',
      label: 'Fecha de Nacimiento',
      inputType: 'date',
      placeholder: 'DD/MM/YYYY',
      maxLength: 10,
      minLength: 10,
      isNullable: false,
      validaciones: ['required', 'pattern'],
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    // Agrega más campos si es necesario
  ],
};
export const patientSearchConfig: FormConfig = {
  nombreEntidad: 'busqueda-pacientes',
  propiedades: [
    {
      columnName: 'centro',
      placeholder: 'Centro',
      inputType: 'text',
      label: 'Centro',
      maxLength: null,
      minLength: 0,
      isNullable: false,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'nombre',
      placeholder: 'Nombre',
      inputType: 'text',
      label: 'Nombre',
      maxLength: null,
      minLength: 0,
      isNullable: false,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
  ],
};
export const patientDiagnosisConfig: FormConfig = {
  nombreEntidad: 'diagnosis',
  propiedades: [
    {
      columnName: 'diagnostico',
      label: 'Tipo de Enfermedad',

      inputType: 'select',
      placeholder: 'tipo de enfermedad',
      maxLength: null,
      minLength: 0,
      isNullable: false,
      selectItems: [
        { value: 'dolor de cabeza', label: 'Dolor de cabeza' },
        { value: 'tendinitis', label: 'Tendinitis' },
        { value: 'alergia', label: 'Alergia' },
        { value: 'otro', label: 'otro' },
      ],
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'comentarios',
      label: 'Comentarios Adicionales',
      type: 'textarea',
      inputType: 'textarea',
      placeholder: '',
      maxLength: null,
      minLength: 0,
      isNullable: false,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
  ],
};
export const patientContactReference: FormConfig = {
  nombreEntidad: 'contacto de referencia',
  propiedades: [
    {
      columnName: 'nombre',
      placeholder: 'Nombre',
      inputType: 'text',
      label: 'Nombre',
      maxLength: null,
      minLength: 0,
      isNullable: false,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'relacion',
      placeholder: 'Relacion',
      inputType: 'text',
      label: 'Relacion',
      maxLength: null,
      minLength: 0,
      isNullable: false,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'telefono',
      placeholder: 'Telefono',
      inputType: 'text',
      label: 'Telefono',
      maxLength: null,
      minLength: 0,
      isNullable: false,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'correo',
      placeholder: 'Correo',
      inputType: 'text',
      label: 'Correo',
      maxLength: null,
      minLength: 0,
      isNullable: false,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
  ],
};
