import { PatientDto } from '../core/Dto/patient.dto';
import { FormConfig } from '../core/interfaces/form-config';

export const appointmentFormConfig: FormConfig = {
  nombreEntidad: 'citas',
  propiedades: [
    {
      columnName: 'id',
      label: 'ID de Cita',
      inputType: 'text',
      isReadOnly: true, // ✅ Propiedad para indicar que es de solo lectura
      placeholder: 'ID de la cita',
      isNullable: true,
      validaciones: [],
      maxLength: null,
      minLength: 0,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'doctor',
      label: 'Doctor',
      inputType: 'autocomplete', // o 'select'
      placeholder: 'Seleccione un doctor',
      isNullable: false,
      validaciones: ['required'],

      maxLength: null,
      minLength: 0,
      searchKey: 'doctors',
      displayWith: (d: PatientDto) => `${d.nombre} ${d.apellido} `,
      optionLabel: 'nombreCompleto',
    },

    {
      columnName: 'duracion',
      label: 'Duración (min)',
      inputType: 'text', // o 'number' si tu componente lo soporta
      placeholder: '60',
      isNullable: false,
      validaciones: ['required'],
      maxLength: null,
      minLength: 0,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'paciente',
      label: 'Paciente',
      inputType: 'autocomplete', // o 'text' si se ingresa manualmente
      placeholder: 'Seleccione o ingrese paciente',
      isNullable: false,
      validaciones: ['required'],
      selectItems: [], // Se podría llenar dinámicamente
      maxLength: null,
      minLength: 0,
      searchKey: 'patients',
      displayWith: (p: PatientDto) => `${p.nombre} ${p.apellido} `,
      optionLabel: 'nombreCompleto',
    },
    {
      columnName: 'estado',
      label: 'Estado',
      inputType: 'select',
      placeholder: 'Estado de la cita',
      isNullable: true,
      validaciones: [],
      selectItems: [
        { value: 'Programada', label: 'Programada' },
        { value: 'Completada', label: 'Completada' },
        { value: 'Cancelada', label: 'Cancelada' },
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'Confirmada', label: 'Confirmada' },
      ],
      maxLength: null,
      minLength: 0,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'fechaHora',
      label: 'Fecha y Hora',
      inputType: 'date',
      isNullable: false,
      validaciones: ['required'],
      placeholder: '',
      maxLength: null,
      minLength: 0,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'especialidad',
      label: 'Especialidad',
      inputType: 'text',
      placeholder: 'Especialidad del doctor',
      isNullable: false,
      validaciones: ['required'],
      maxLength: null,
      minLength: 0,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'descripcion',
      label: 'Descripción',
      inputType: 'textarea',
      placeholder: 'Detalles de la cita',
      isNullable: true,
      validaciones: [],
      maxLength: null,
      minLength: 0,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
  ],
};

export const appointmentListForm: FormConfig = {
  nombreEntidad: 'listado-citas',
  propiedades: [
    {
      columnName: 'nombre',
      label: 'Nombre',
      inputType: 'text',
      placeholder: 'Nombre',
      isNullable: true,
      validaciones: [],
      maxLength: null,
      minLength: 0,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'estado',
      label: 'Estado',
      inputType: 'select',
      placeholder: 'Estado de la cita',
      isNullable: false,
      validaciones: ['required'],
      selectItems: [
        { value: 'Programada', label: 'Programada' },
        { value: 'Completada', label: 'Completada' },
        { value: 'Cancelada', label: 'Cancelada' },
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'Confirmada', label: 'Confirmada' },
      ],
      maxLength: null,
      minLength: 0,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
  ],
};
