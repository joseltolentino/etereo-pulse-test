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
    },
    {
      columnName: 'doctor',
      label: 'Doctor',
      inputType: 'autocomplete', // o 'select'
      placeholder: 'Seleccione un doctor',
      isNullable: false,
      validaciones: ['required'],
      selectItems: [
        { value: 'Dr. Smith', label: 'Dr. Smith' },
        { value: 'Dra. Johnson', label: 'Dra. Johnson' },
      ],
      maxLength: null,
      minLength: 0,
      searchKey: 'doctors',
    },
    {
      columnName: 'hora',
      label: 'Hora',
      inputType: 'text', // O un componente de selector de hora
      placeholder: 'hh:mm',
      isNullable: false,
      validaciones: ['required'],
      maxLength: null,
      minLength: 0,
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
    },
    {
      columnName: 'fecha',
      label: 'Fecha',
      inputType: 'date',
      isNullable: false,
      validaciones: ['required'],
      placeholder: '',
      maxLength: null,
      minLength: 0,
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
      ],
      maxLength: null,
      minLength: 0,
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
    },
  ],
};
