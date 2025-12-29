import { Patient } from '../../features/patients/models/patient.model';
import { Doctor } from '../../features/staff/models/doctor.model';

export interface Appointment {
  id?: number;

  patient: Patient | null;
  doctor: Doctor | null;

  patientId?: number;
  doctorId?: number;

  especialidad: string | null;
  fecha: Date;
  hora: string | null;
  duracion: number;
  descripcion: string;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | null;
}
