import { AppointmentDto } from '../Dto/appointments.dto';

export const CITAS_MOCK: AppointmentDto[] = [
  {
    id: 1,
    idPaciente: 1,
    idDoctor: 5,
    fechaCita: '2025-08-02T09:00',
    horaCita: '09:30 am.',
    especialidad: 'Ginecología',
    estado: 'pendiente',
  },
  {
    id: 2,
    idPaciente: 2,
    idDoctor: 2,
    fechaCita: '2025-08-03T11:00',
    horaCita: '09:50 am.',
    especialidad: 'Pediatría',
    estado: 'atendida',
  },
];
