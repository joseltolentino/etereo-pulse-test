import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { PatientService } from '../../../../features/patients/services/patient.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TableDynamicComponent } from '../../../../shared/component/table-dynamic/table-dynamic.component';
import { PatientDto } from '../../../../core/Dto/patient.dto';

import { ConfirmDialog } from 'primeng/confirmdialog';

import { FormsModule } from '@angular/forms';
import {
  DynamicFormComponent,
  FormConfigConValor,
} from '../../../../shared/component/dinamic-form/dinamic-form.component';
import { patientSearchConfig } from '../../../../config/form-config-patient';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    TableModule,
    TableDynamicComponent,
    RouterModule,
    ConfirmDialog,
    FormsModule,
    DynamicFormComponent,
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class PatientListComponent implements OnInit {
  private patientService = inject(PatientService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);

  // Computed para leer signals del servicio
  allPatients = computed(() => this.patientService.patientsList());
  loading = computed(() => this.patientService.loading());

  searchForm!: FormGroup;
  // Signal para almacenar los datos de búsqueda. Nulo al inicio.
  searchData = signal<any | null>(null);

  patients = computed<PatientDto[]>(() => {
    const all = this.allPatients();
    const search = this.searchData();

    if (!search || Object.values(search).every((value) => !value)) {
      return all;
    }

    //filtra la lista de pacientes segun los criterios del formulario
    return all.filter((patient) => {
      let match = true;
      if (search.centro && patient.centro) {
        match =
          match &&
          patient.centro.toLowerCase().includes(search.centro.toLowerCase());
      }
      if (search.nombre) {
        const searchTerm = search.nombre.toLowerCase();
        match =
          match &&
          (patient.nombre.toLowerCase().includes(searchTerm) ||
            patient.apellido.toLocaleLowerCase().includes(searchTerm));
      }
      return match;
    });
  });

  // ✅ NUEVA CONFIGURACIÓN DEL FORMULARIO DE BÚSQUEDA
  formConfig = patientSearchConfig;

  columnas = [
    { field: 'nombre', header: 'Nombre', type: 'text' },
    { field: 'apellido', header: 'Apellido', type: 'text' },
    { field: 'direccion', header: 'Direccion', type: 'text' },
    { field: 'dni', header: 'DNI', type: 'text' },
    { field: 'telefono', header: 'Telefono', type: 'text' },
    { field: 'email', header: 'Email', type: 'text' },
    { field: 'fechaNacimiento', header: 'Nacimiento', type: 'text' },
    { field: 'foto', header: 'Foto', type: 'image' },
    { field: 'acciones', header: 'Acciones', type: 'actions' },
  ];

  constructor() {
    // efecto para mostrar toasts cuando se elimina (o realizar otras reacciones)
    effect(() => {
      const change = this.patientService.entityChanged();
      if (!change) return;
      if (change.type === 'update') {
        this.messageService.add({
          severity: 'info',
          summary: 'Paciente actualizado',
          detail: `${change.patient.nombre} ha sido actualizado`,
          life: 3000,
        });
      }
      if (change.type === 'delete') {
        this.messageService.add({
          severity: 'warn',
          summary: 'Paciente eliminado',
          detail: `Paciente con Id ${change.patient.id} Elinimado`,
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.allPatients().length === 0) {
      this.patientService.getPatients();
    }
  }

  // ✅ NUEVO método para capturar el FormGroup del formulario dinámico
  onSearchFormCreated(form: FormGroup): void {
    this.searchForm = form;
  }

  // ✅ NUEVO método para manejar el clic del botón Buscar
  search(): void {
    if (this.searchForm) {
      // Actualiza la señal de búsqueda con los valores del formulario
      this.searchData.set(this.searchForm.value);

      // Agrega un mensaje si la búsqueda no tiene resultados
      if (this.patients().length === 0) {
        this.messageService.add({
          severity: 'info',
          summary: 'Búsqueda sin resultados',
          detail:
            'No se encontraron pacientes que coincidan con los criterios.',
        });
      }
    }
  }

  edit(id: number) {
    // Selecciona paciente y navega a detail
    /* this.patientService.selectPatient(p); */
    this.router.navigate(['/patients/detail', id]);
    console.log('paciente corregido', id);
  }

  remove(id: number) {
    const patient = this.patients().find((p) => p.id === id);
    console.log('borrado paciente', id);
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar a ${patient?.nombre} ${patient?.apellido}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientService.deletePatient(id);
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Paciente eliminado correctamente',
        });
      },
    });
    // El servicio hace la petición y actualiza la señal => la vista se actualiza sola
  }
}
