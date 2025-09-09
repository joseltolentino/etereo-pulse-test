import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {
  DynamicFormComponent,
  FormConfigConValor,
} from '../../../../shared/component/dinamic-form/dinamic-form.component';

import { appointmentFormConfig } from '../../../../config/form-config-appointment';
import { CardModule } from 'primeng/card';
import { PatientService } from '../../../patients/services/patient.service';
import { DoctorService } from '../../../staff/services/doctors.service';
import { AppointmentsService } from '../../services/appointments.service';
import { AppointmentDto } from '../../../../core/Dto/appointments.dto';

import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-appointments-form',
  imports: [DynamicFormComponent, ButtonModule, CardModule, ToastModule],
  templateUrl: './appointments-form.component.html',
  styleUrl: './appointments-form.component.css',
})
export class AppointmentsFormComponent {
  private patientService = inject(PatientService);
  private doctorService = inject(DoctorService);
  private service = inject(AppointmentsService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  appointmentForm!: FormGroup;
  formConfig: FormConfigConValor = appointmentFormConfig as FormConfigConValor;

  searchOptions = signal<{ [key: string]: any[] }>({
    patients: [],
    doctors: [],
  });
  /* doctorsOptions = signal<any[]>([]); */

  searchFunctions = {
    patients: (query: string) => this.searchPatients(query),
    doctors: (query: string) => this.searchDoctors(query),
  };

  onFormCreated(form: FormGroup) {
    this.appointmentForm = form;
  }
  // Lógica de búsqueda para pacientes
  searchPatients(query: string) {
    this.patientService.searchPatients(query).subscribe((patients) => {
      this.searchOptions.update((options) => ({
        ...options,
        patients: patients.map((p) => ({
          ...p,
          nombreCompleto: `${p.nombre} ${p.apellido}`, // La propiedad para mostrar
        })),
      }));
    });
  }

  // Método que busca doctores y actualiza la señal
  searchDoctors(query: string) {
    this.doctorService.searchDoctors(query).subscribe((doctors) => {
      this.searchOptions.update((options) => ({
        ...options,
        doctors: doctors.map((d) => ({
          ...d,

          nombreCompleto: `${d.nombre} ${d.apellido}`, // La propiedad para mostrar
        })),
      }));
    });
  }

  onSubmitAppointment() {
    if (this.appointmentForm.valid) {
      const raw = this.appointmentForm.value;

      const newAppointment: AppointmentDto = {
        doctor: raw.doctor?.nombreCompleto ?? raw.doctor,
        especialidad: raw.doctor?.especialidad ?? raw.especialidad,
        paciente: raw.paciente?.nombreCompleto ?? raw.paciente,
        fechaHora: raw['fechaHora'] ?? raw['fecha y hora'],
        duracion: raw.duracion,
        descripcion: raw.descripcion,
        estado: raw.estado,
      };

      this.service.createAppointment(newAppointment).subscribe({
        next: (saved) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Cita registrada',
            detail: `La cita de ${saved.paciente} fue creada correctamente.`,
          });
          console.log('✅ Cita guardada:', saved);
          this.appointmentForm.reset();

          // redirigir después de un pequeño delay (para que el toast aparezca)
          setTimeout(() => this.router.navigate(['/appointments']), 1000);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo registrar la cita. Intenta nuevamente.',
          });
        },
      });
    }
  }
  goToAppointment() {
    this.router.navigate(['/appointments']);
  }
}
