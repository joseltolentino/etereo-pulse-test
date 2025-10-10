/* import { Component } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-patient-doctor',
  imports: [InputText, CardModule],
  templateUrl: './patient-doctor.component.html',
  styleUrl: './patient-doctor.component.css',
})
export class PatientDoctorComponent {}
 */

import { Component, inject, signal } from '@angular/core';
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
  private patientService = inject(PatientService);
  private doctorService = inject(DoctorService);

  // Señales para almacenar los objetos seleccionados
  pacienteSeleccionado = signal<any | null>(null);
  medicoSeleccionado = signal<any | null>(null);

  // FormGroups creados dinámicamente
  pacienteForm!: FormGroup;
  medicoForm!: FormGroup;

  // Configuraciones dinámicas
  pacienteConfig: FormConfigConValor = patientSearchConfig;
  medicoConfig: FormConfigConValor = doctorSearchConfig;

  // Capturar FormGroups creados por DynamicForm
  onPacienteFormCreated(form: FormGroup) {
    this.pacienteForm = form;
  }

  onMedicoFormCreated(form: FormGroup) {
    this.medicoForm = form;
  }

  // Buscar paciente y actualizar señal
  buscarPaciente() {
    if (!this.pacienteForm) return;
    const nombre = this.pacienteForm.value.nombre;
    this.patientService.searchPatients(nombre).subscribe((res) => {
      this.pacienteSeleccionado.set(res.length ? res[0] : null);
    });
  }

  // Buscar médico y actualizar señal
  buscarMedico() {
    if (!this.medicoForm) return;
    const nombre = this.medicoForm.value.nombre;
    this.doctorService.searchDoctors(nombre).subscribe((res) => {
      this.medicoSeleccionado.set(res.length ? res[0] : null);
    });
  }
  continuar() {
    if (this.pacienteSeleccionado() && this.medicoSeleccionado()) {
      console.log('📅 Cita preparada:', {
        paciente: this.pacienteSeleccionado(),
        medico: this.medicoSeleccionado(),
      });
      alert('Cita lista para continuar 🚑');
    }
  }
}
