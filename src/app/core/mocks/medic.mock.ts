import { DoctorDto } from '../Dto/doctor.dto';

export const MEDICOS_MOCK: DoctorDto[] = [
  {
    id: 1,
    nombre: 'Dra. Camila',
    apellido: 'Soto',
    especialidad: 'Ginecología',
    cmp: 'CMP1234',
    telefono: '923450987',
  },
  {
    id: 2,
    nombre: 'Dr. Mario',
    apellido: 'Díaz',
    especialidad: 'Pediatría',
    cmp: 'CMP5678',
    telefono: '992288773',
  },
];
