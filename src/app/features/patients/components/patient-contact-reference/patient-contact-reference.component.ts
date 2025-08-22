import { Component, computed, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FormConfigConValor,
  DynamicFormComponent,
} from '../../../../shared/component/dinamic-form/dinamic-form.component';
import { patientContactReference } from '../../../../config/form-config-patient';
import { PatientService } from '../../services/patient.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-patient-contact-reference',
  imports: [DynamicFormComponent, ButtonModule],
  templateUrl: './patient-contact-reference.component.html',
  styleUrl: './patient-contact-reference.component.css',
})
export class PatientContactReferenceComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private patientService = inject(PatientService);
  private messageService = inject(MessageService);

  contactForm!: FormGroup;

  formConfig: FormConfigConValor =
    patientContactReference as FormConfigConValor;

  loading = computed(() => this.patientService.loading());
  patient = computed(() => this.patientService.currentPatient());

  onFormCreated(form: FormGroup) {
    this.contactForm = form;
  }
  guardar() {
    if (this.contactForm && this.contactForm.valid) {
      console.log('Formulario válido:', this.contactForm.value);
      // Aquí puedes llamar a tu servicio para guardar los datos
    } else {
      console.log('Formulario inválido o no inicializado');
      if (this.contactForm) {
        this.contactForm.markAllAsTouched();
      }
    }
  }
}
