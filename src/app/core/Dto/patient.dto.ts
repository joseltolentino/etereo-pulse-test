export interface PatientDto {
  id: number;
  centro: string;
  nombre: string;
  apellido: string;
  fechaNacimiento?: string;
  genero?: 'masculino' | 'femenino' | 'otro';
  direccion: string;
  telefono: string;
  email?: string;
}
