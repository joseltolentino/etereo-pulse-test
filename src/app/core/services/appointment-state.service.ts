import { Injectable, signal } from '@angular/core';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentStateService {
  appointment = signal<Appointment>({
    id: undefined,
    patient: null,
    doctor: null,
    doctorId: undefined,
    patientId: undefined,
    especialidad: null,
    fecha: new Date(),
    hora: null,
    duracion: 0,
    descripcion: '',
    estado: null,
  });

  setPatient(patient: any) {
    this.appointment.update((a) => ({ ...a, patient }));
  }

  setDoctor(doctor: any) {
    this.appointment.update((a) => ({ ...a, doctor }));
  }

  setFecha(fecha: Date) {
    this.appointment.update((a) => ({ ...a, fecha }));
  }

  setDescripcion(descripcion: string) {
    this.appointment.update((a) => ({ ...a, descripcion }));
  }

  setEstado(estado: Appointment['estado']) {
    this.appointment.update((a) => ({ ...a, estado }));
  }

  reset() {
    this.appointment.set({
      id: undefined,
      patient: null,
      doctor: null,
      doctorId: undefined,
      patientId: undefined,
      especialidad: null,
      fecha: new Date(),
      hora: null,
      duracion: 0,
      descripcion: '',
      estado: null,
    });
  }
}
