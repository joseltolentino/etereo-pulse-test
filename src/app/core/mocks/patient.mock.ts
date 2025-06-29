import { PatientDto } from '../models/patient.dto';

export const pacienteBase: PatientDto = {
  id: '',
  nombre: '',
  apellido: '',
  fechaNacimiento: new Date(),
  genero: 'otro',
  direccion: '',
  telefono: '',
  email: '',
};
