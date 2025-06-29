// src/app/features/pacientes/services/paciente.service.ts
import { Injectable } from '@angular/core';
import { PatientDto } from '../../../core/models/patient.dto';
import { Observable, of } from 'rxjs'; // Para datos locales, usa 'of' para simular Observable

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private pacientes: PatientDto[] = [
    {
      id: '1',
      nombre: 'Juan',
      apellido: 'Perez',
      fechaNacimiento: new Date('1990-05-15'),
      genero: 'masculino',
      direccion: 'Calle Falsa 123',
      telefono: '555-1234',
      email: 'juan.perez@example.com',
    },
    // Agrega más datos de prueba aquí
  ];

  constructor() {}

  getPacientes(): Observable<PatientDto[]> {
    // Simula una llamada a la API
    return of(this.pacientes);
  }

  getPacienteById(id: string): Observable<PatientDto | undefined> {
    return of(this.pacientes.find((p) => p.id === id));
  }

  addPaciente(paciente: PatientDto): Observable<PatientDto> {
    paciente.id = (this.pacientes.length + 1).toString(); // Generación simple de ID
    this.pacientes.push(paciente);
    return of(paciente);
  }

  updatePaciente(paciente: PatientDto): Observable<PatientDto> {
    const index = this.pacientes.findIndex((p) => p.id === paciente.id);
    if (index > -1) {
      this.pacientes[index] = paciente;
    }
    return of(paciente);
  }

  deletePaciente(id: string): Observable<boolean> {
    this.pacientes = this.pacientes.filter((p) => p.id !== id);
    return of(true);
  }
}
