export interface AppointmentDto {
  id?: number; // lo genera json-server
  doctor: string; // siempre guardar solo nombreCompleto
  especialidad: string;
  paciente: string; // siempre guardar solo nombreCompleto
  fechaHora: string; // ISO string: "2025-08-26T15:30:00"
  duracion: string;
  descripcion?: string;
  estado: 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada';
}
