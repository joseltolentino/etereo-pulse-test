import { Component, computed, inject } from '@angular/core';

import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { patientDiagnosisConfig } from '../../../../config/form-config-patient';
import {
  DynamicFormComponent,
  FormConfigConValor,
} from '../../../../shared/component/dinamic-form/dinamic-form.component';

@Component({
  selector: 'app-patient-diagnosis-form',
  imports: [
    TextareaModule,
    FloatLabelModule,
    ButtonModule,
    DynamicFormComponent,
  ],
  templateUrl: './patient-diagnosis-form.component.html',
  styleUrl: './patient-diagnosis-form.component.css',
})
export class PatientDiagnosisFormComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private patientService = inject(PatientService);
  private messageService = inject(MessageService);

  diagnosisForm!: FormGroup;

  formConfig: FormConfigConValor = patientDiagnosisConfig as FormConfigConValor;

  loading = computed(() => this.patientService.loading());
  patient = computed(() => this.patientService.currentPatient());

  handleFormCreated(form: FormGroup) {
    this.diagnosisForm = form;
  }
  guardarDiagnostico() {
    if (this.diagnosisForm && this.diagnosisForm.valid) {
      console.log('Formulario válido:', this.diagnosisForm.value);
      // Aquí puedes llamar a tu servicio para guardar los datos
    } else {
      console.log('Formulario inválido o no inicializado');
      if (this.diagnosisForm) {
        this.diagnosisForm.markAllAsTouched();
      }
    }
  }
}
