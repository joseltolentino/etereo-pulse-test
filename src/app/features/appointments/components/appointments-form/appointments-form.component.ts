import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DynamicFormComponent,
  FormConfigConValor,
} from '../../../../shared/component/dinamic-form/dinamic-form.component';
import { ButtonModule } from 'primeng/button';
import { appointmentFormConfig } from '../../../../config/form-config-appointment';
import { CardModule } from 'primeng/card';
import { PatientService } from '../../../patients/services/patient.service';

@Component({
  selector: 'app-appointments-form',
  imports: [DynamicFormComponent, ButtonModule, CardModule],
  templateUrl: './appointments-form.component.html',
  styleUrl: './appointments-form.component.css',
})
export class AppointmentsFormComponent {
  private patientService = inject(PatientService);
  /* private doctorService = inject(DoctorService); */
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
  doctorService: any;
  onFormCreated(form: FormGroup) {
    this.appointmentForm = form;
  }
  // Lógica de búsqueda para pacientes
  searchPatients(query: string) {
    this.patientService.searchPatients(query).subscribe((patients) => {
      this.searchOptions.update((options) => ({
        ...options,
        patients: patients.map((p) => ({
          label: p.nombre,
          value: p.id,
        })),
      }));
    });
  }

  // Método que busca doctores y actualiza la señal
  searchDoctors(query: string) {
    this.doctorService.searchDoctors(query).subscribe((medic: any[]) => {
      this.searchOptions.update((options) => ({
        ...options,
        doctors: medic.map((d: { nombre: any; id: any }) => ({
          label: d.nombre,
          value: d.id,
        })),
      }));
    });
  }
}
