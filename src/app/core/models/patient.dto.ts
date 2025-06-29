export interface PatientDto {
  id: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  genero: 'masculino' | 'femenino' | 'otro';
  direccion: string;
  telefono: string;
  email: string;
}
