import { FormConfig } from '../core/interfaces/form-config';

export const formConfigRegister: FormConfig = {
  nombreEntidad: 'register',
  propiedades: [
    {
      columnName: 'username',
      placeholder: 'Usuario',
      type: 'text',
      validaciones: ['required', 'maxLength:15'],
      minLength: 4,
      maxLength: 15,
      label: 'Nombre de Usuario', // Añadido para mejor visualización
      inputType: 'text', // Asegúrate de que inputType esté definido
      isNullable: false,
      selectItems: null,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'email',
      placeholder: 'Correo Electrónico',
      type: 'text',
      validaciones: ['required', 'email'], // Añadida validación de email
      label: 'Correo Electrónico',
      inputType: 'text',
      maxLength: 256, // Un email puede ser más largo
      minLength: 0,
      isNullable: false,
      selectItems: null,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
    {
      columnName: 'password',
      placeholder: 'Contraseña',
      type: 'password',
      validaciones: ['required', 'minLength:6'], // Cambiado a minLength para contraseña
      minLength: 6,
      label: 'Contraseña',
      inputType: 'password', // Para input type password, el inputType es 'text' o 'password'
      maxLength: 10, // Añadido un maxLength razonable
      isNullable: false,
      selectItems: null,
      displayWith: function (value: any): string {
        throw new Error('Function not implemented.');
      },
      optionLabel: '',
    },
  ],
};
