import {
  Component,
  EventEmitter,
  Output,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup } from '@angular/forms';
import {
  DynamicFormComponent,
  FormConfigConValor,
} from '../../../../shared/component/dinamic-form/dinamic-form.component';
import { PatientService } from '../../../../features/patients/services/patient.service';
import { DoctorService } from '../../../../features/staff/services/doctors.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  patientSearchConfig,
  doctorSearchConfig,
} from '../../../../config/form-config-appointment';
import { AppointmentStateService } from '../../../../core/services/appointment-state.service';

@Component({
  selector: 'app-patient-doctor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DynamicFormComponent,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './patient-doctor.component.html',
  styleUrl: './patient-doctor.component.css',
})
export class PatientDoctorComponent {
  private appointmentState = inject(AppointmentStateService);
  private patientService = inject(PatientService);
  private doctorService = inject(DoctorService);

  // Exponer estado al template como signals
  pacienteSeleccionado = computed(
    () => this.appointmentState.appointment().patient
  );

  medicoSeleccionado = computed(
    () => this.appointmentState.appointment().doctor
  );

  @Output() selected = new EventEmitter<void>();

  // FormGroups creados dinámicamente
  pacienteForm!: FormGroup;
  medicoForm!: FormGroup;

  // Configuraciones dinámicas
  pacienteConfig: FormConfigConValor = patientSearchConfig;
  medicoConfig: FormConfigConValor = doctorSearchConfig;

  // Capturar los formularios creados
  onPacienteFormCreated(form: FormGroup) {
    this.pacienteForm = form;
  }

  onMedicoFormCreated(form: FormGroup) {
    this.medicoForm = form;
  }

  // Buscar paciente
  buscarPaciente() {
    if (!this.pacienteForm) return;
    const nombre = this.pacienteForm.value.nombre?.trim();
    if (!nombre) return;

    this.patientService.searchPatients(nombre).subscribe((res) => {
      const paciente = res.length ? res[0] : null;
      this.appointmentState.setPatient(paciente);
    });
  }

  // Buscar médico
  buscarMedico() {
    if (!this.medicoForm) return;
    const nombre = this.medicoForm.value.nombre?.trim();
    if (!nombre) return;

    this.doctorService.searchDoctors(nombre).subscribe((res) => {
      const medico = res.length ? res[0] : null;
      this.appointmentState.setDoctor(medico);
    });
  }

  // Continuar al siguiente paso
  continuar() {
    const { patient, doctor } = this.appointmentState.appointment();
    if (patient && doctor) {
      this.selected.emit(); // Notifica al padre que puede avanzar
    }
  }
}
