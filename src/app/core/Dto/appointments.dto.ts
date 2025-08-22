export interface AppointmentDto {
  id?: number;
  idPaciente: number; // Referencia al ID del paciente
  idDoctor: number; // Referencia al ID del doctor
  fechaCita: string;
  especialidad: string;
  horaCita: string;
  estado: 'pendiente' | 'atendida' | 'cancelada';
  motivo?: string;
}
