export interface DoctorDto {
  id?: number;
  nombre: string;
  apellido: string;
  especialidad?: string;

  telefono: string;
  email?: string;
  cmp: string;
}
