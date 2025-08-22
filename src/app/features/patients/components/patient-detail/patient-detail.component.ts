/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { PatientDto } from '../../../../core/Dto/patient.dto';
import { patientFormConfig } from '../../../../config/form-config-patient';
import { DynamicFormComponent } from '../../../../shared/component/dinamic-form/dinamic-form.component';

import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [
    DynamicFormComponent,
    ToastModule,
    ButtonModule,
    CardModule,
    RouterModule,
  ],
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.css',
  providers: [MessageService],
})
export class PatientDetailComponent implements OnInit {
  patientId!: number;
  loading = true;
  detailForm: FormGroup = new FormGroup({});
  formConfig = patientFormConfig;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));

    this.patientService.getPatient(this.patientId).subscribe({
      next: (patient: PatientDto) => {
        if (this.detailForm) {
          this.detailForm.patchValue(patient);
        }
        this.loading = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Paciente no encontrado',
        });
        this.router.navigate(['/pacientes']);
      },
    });
  }

  onFormCreated(form: FormGroup) {
    this.detailForm = form;
  }

  onSubmit(): void {
    if (!this.detailForm || this.detailForm.invalid) return;

    const updatedPatient: PatientDto = {
      id: this.patientId,
      ...this.detailForm.value,
    };

    this.patientService
      .updatePatient(this.patientId, updatedPatient)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Paciente actualizado correctamente',
          });
          setTimeout(() => this.router.navigate(['/patients']), 1500);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el paciente',
          });
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/patients']);
  }
} */
// src/app/features/patients/components/patient-detail/patient-detail.component.ts
import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import {
  DynamicFormComponent,
  FormConfigConValor,
} from '../../../../shared/component/dinamic-form/dinamic-form.component';
import { PatientService } from '../../services/patient.service';
import { patientFormConfig } from '../../../../config/form-config-patient';
import { FormConfig } from '../../../../core/interfaces/form-config';
import { PatientDto } from '../../../../core/Dto/patient.dto';

import { Dialog } from 'primeng/dialog';

import { Card } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';

import { PatientDiagnosisFormComponent } from '../patient-diagnosis-form/patient-diagnosis-form.component';
import { PatientContactReferenceComponent } from '../patient-contact-reference/patient-contact-reference.component';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [
    DynamicFormComponent,
    Card,
    ToastModule,
    NgIf,
    ProgressSpinner,
    ButtonModule,
    ReactiveFormsModule,
    Dialog,
    PatientDiagnosisFormComponent,
    PatientContactReferenceComponent,
  ],
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css'],
  providers: [MessageService],
})
export class PatientDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private patientService = inject(PatientService);
  private messageService = inject(MessageService);

  dialog: 'dialogI' | 'dialogII' = 'dialogI';

  visibleDialogI: boolean = false;
  visibleDialogII: boolean = false;

  detailForm: FormGroup | null = null;

  loading = computed(() => this.patientService.loading());
  patient = computed(() => this.patientService.currentPatient());

  // ✅ SOLUCIÓN: Usar `toSignal` para una lectura reactiva del ID de la ruta.
  // Esto elimina la necesidad de múltiples effects para la carga de datos.
  readonly patientId = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id'))))
  );

  // El cambio clave: ahora formConfig es un computed signal
  formConfig = computed<FormConfigConValor | null>(() => {
    const p = this.patient();
    if (!p) {
      return null;
    }
    const updatedPropiedades = patientFormConfig.propiedades.map((prop) => ({
      ...prop,
      value: (p as any)[prop.columnName] ?? '',
    }));

    return {
      ...patientFormConfig,
      propiedades: updatedPropiedades,
    };
  });

  constructor() {
    // ✅ Un solo effect para la carga de datos.

    effect(() => {
      const id = this.patientId();
      if (id && id > 0) {
        // Validamos que el ID sea válido antes de llamar al servicio
        this.patientService.getPatient(id);
      }
    });

    //  solo reacciona a los cambios en la señal del paciente
    // para actualizar el formulario.
    effect(() => {
      const p = this.patient();
      if (p && this.detailForm) {
        this.detailForm.patchValue(p);
      }
    });

    // Este effect está bien.
    effect(() => {
      const action = this.patientService.lastAction();
      if (!action) return;

      if (action.type === 'update' && action.id === this.patient()?.id) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Paciente actualizado correctamente',
        });
        setTimeout(() => this.router.navigate(['/patients']), 1500);
      }
      this.patientService.lastAction.set(null);
    });
  }

  // Usamos ngOnInit para inicializar el formulario si es necesario
  ngOnInit(): void {
    const p = this.patient();
    if (p && this.detailForm) {
      this.detailForm.patchValue(p);
      this.detailForm.markAsPristine();
    }
  }

  onFormCreated(form: FormGroup): void {
    this.detailForm = form;
    const p = this.patient();
    if (p) {
      this.detailForm.patchValue(p);
      this.detailForm.markAsPristine();
    }
  }

  onSubmit(): void {
    if (!this.detailForm || this.detailForm.invalid) {
      this.detailForm?.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, corrige los errores del formulario.',
      });
      return;
    }

    const id = this.patient()?.id;
    if (!id) return;

    const payload = {
      ...this.patient(),
      ...this.detailForm.value,
    } as PatientDto;
    this.patientService.updatePatient(id, payload);
  }

  goBack(): void {
    this.router.navigate(['/patients']);
  }
  showDialog(dialogId: string) {
    if (dialogId === 'dialogI') {
      this.visibleDialogI = true;
      this.visibleDialogII = false; // Asegura que el otro diálogo esté cerrado
    } else if (dialogId === 'dialogII') {
      this.visibleDialogII = true;
      this.visibleDialogI = false; // Asegura que el otro diálogo esté cerrado
    }
  }
}
