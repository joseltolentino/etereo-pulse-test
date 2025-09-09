import {
  Component,
  computed,
  effect,
  EnvironmentInjector,
  inject,
  runInInjectionContext,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  DynamicFormComponent,
  FormConfigConValor,
} from '../../../../shared/component/dinamic-form/dinamic-form.component';
import { TableDynamicComponent } from '../../../../shared/component/table-dynamic/table-dynamic.component';
import { FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { appointmentListForm } from '../../../../config/form-config-appointment';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AppointmentsService } from '../../services/appointments.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { AppointmentDto } from '../../../../core/Dto/appointments.dto';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-appointments-list',
  imports: [
    DynamicFormComponent,
    TableDynamicComponent,
    ButtonModule,
    CardModule,
    ToastModule,
    ConfirmDialog,
    RouterModule,
  ],
  templateUrl: './appointments-list.component.html',
  styleUrl: './appointments-list.component.css',
  providers: [MessageService, ConfirmationService],
})
export class AppointmentsListComponent {
  private service = inject(AppointmentsService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private injector = inject(EnvironmentInjector);

  appointmentListForm!: FormGroup;
  formConfig: FormConfigConValor = appointmentListForm;

  // Citas cargadas desde el servicio (signal)
  appointments = this.service.appointments;

  formValueSignal: WritableSignal<any> = signal<any>(null);
  // Estado reactivo del formulario, inicializado con un signal de un valor vacío.
  /*  liveValues: WritableSignal<any> = signal({}); */

  // Signal computado para el mensaje de no hay coincidencias
  noResultsMessage = computed<string | null>(() => {
    const filtered = this.filteredAppointments();
    const search = this.formValueSignal();

    if (!search || Object.keys(search).length === 0) {
      return null;
    }

    const hasTerm = !!(search?.nombre && search.nombre.toString().trim());
    const estadoText = (
      typeof search?.estado === 'string'
        ? search?.estado
        : search?.estado?.value ?? search?.estado?.label ?? ''
    )
      ?.toString()
      .trim();
    const hasEstado = !!estadoText;
    const hasFilters = hasTerm || hasEstado;

    if (hasFilters && filtered.length === 0) {
      return hasTerm || hasEstado
        ? `No se encontraron resultados${
            hasTerm ? ` para “${search!.nombre}”` : ''
          }${hasEstado ? ` con estado “${estadoText}”` : ''}.`
        : 'No hay resultados.';
    }

    return null;
  });

  // Signal computado para la lista filtrada
  filteredAppointments = computed<AppointmentDto[]>(() => {
    const all = this.appointments();
    const search = this.formValueSignal();
    const searchObj = search || {};

    if (Object.keys(searchObj).length === 0) {
      return all;
    }

    const termWords = (searchObj.nombre ?? '')
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((word: string) => word.length > 0);

    const estadoValue = (
      typeof searchObj.estado === 'string'
        ? searchObj.estado
        : searchObj.estado?.value ?? searchObj.estado?.label ?? ''
    )
      .trim()
      .toLowerCase();

    if (termWords.length === 0 && estadoValue === '') {
      return all;
    }

    return all.filter((appointment) => {
      let match = true;
      const paciente = (appointment.paciente ?? '').toString().toLowerCase();
      const doctor = (appointment.doctor ?? '').toString().toLowerCase();

      if (termWords.length > 0) {
        const allWordsMatch = termWords.every(
          (word: string) => paciente.includes(word) || doctor.includes(word)
        );
        match = match && allWordsMatch;
      }

      if (estadoValue) {
        match =
          match && (appointment.estado ?? '').toLowerCase() === estadoValue;
      }

      return match;
    });
  });

  columnas = [
    { field: 'id', header: 'Id', type: 'text' },
    { field: 'doctor', header: 'Doctor', type: 'text' },
    { field: 'especialidad', header: 'Especialidad', type: 'text' },
    { field: 'paciente', header: 'Paciente', type: 'text' },
    { field: 'fechaHora', header: 'Fecha/Hora', type: 'text' },
    { field: 'duracion', header: 'Duración', type: 'text' },
    { field: 'descripcion', header: 'Descripción', type: 'text' },
    { field: 'estado', header: 'Estado', type: 'text' },
    { field: 'acciones', header: 'Acciones', type: 'actions' },
  ];

  constructor() {
    this.service.loadAppointments();
    effect(() => {
      const message = this.noResultsMessage();
      this.messageService.clear('search');
      if (message) {
        this.messageService.add({
          key: 'search',
          severity: 'warn',
          summary: 'Sin coincidencias',
          detail: message,
          life: 4000,
        });
      }
    });
  }

  onAppointmentFormCreated(form: FormGroup) {
    this.appointmentListForm = form;

    // Aquí convertimos el Observable a un Signal y lo usamos para
    // actualizar el 'writableSignal' que los 'computed' y 'effect' consumen.
    //  Esto es para una busqueda en tiempo real.

    /*     runInInjectionContext(this.injector, () => {
      const formValueSignal = toSignal(
        this.appointmentListForm.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged()
        ),
        { initialValue: this.appointmentListForm.value }
      );

      // Un único effect para sincronizar el formValueSignal con el liveValues
      effect(() => {
        this.formValueSignal.set(formValueSignal() || {});
      });
    }); */
  }

  onSearch(): void {
    const formValues = this.appointmentListForm?.value || {};
    this.formValueSignal.set(formValues);
  }

  onClearForm(): void {
    this.appointmentListForm?.reset();
    this.formValueSignal.set(null);
  }

  hasSearchValues(values: any): boolean {
    if (!values) return false;
    return Object.values(values).some(
      (v) => v !== null && v !== undefined && v.toString().trim() !== ''
    );
  }

  onAppointmentForm() {
    this.router.navigate(['/appointments/appointmentForm']);
  }

  remove(id: number) {
    const appointment = this.service.appointments().find((a) => a.id === id);
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar la cita de ${appointment?.paciente} con el doctor ${appointment?.doctor}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteAppointment(id);
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Cita eliminada correctamente',
        });
      },
    });
  }
}
