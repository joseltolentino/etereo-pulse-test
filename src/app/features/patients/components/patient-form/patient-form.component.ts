import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas
import { FormService } from '../../../../core/services/form.service';
import { PatientDto } from '../../../../core/models/patient.dto';
import { FormConfig } from '../../../../core/interfaces/form-config.interface';
import { FormGroup } from '@angular/forms';
import { PacienteService } from '../../services/patient.service';
import { DynamicFormComponent } from '../../../../shared/component/dinamic-form/dinamic-form.component'; // Importa el componente dinámico
import { pacienteBase } from '../../../../core/mocks/patient.mock';

@Component({
  selector: 'app-patient-form',
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css',
})
export class PatientFormComponent implements OnInit {
  formConfig!: FormConfig;
  pacienteFormGroup!: FormGroup;
  modoEdicion: boolean = false;
  pacienteId: string | null = null; // En una app real, esto vendría de los parámetros de la ruta

  constructor(
    private formService: FormService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    // Simulación de carga de ID desde la ruta para modo edición
    this.pacienteId = '1'; // Para probar la edición, descomenta y asigna un ID existente

    if (this.pacienteId) {
      this.modoEdicion = true;
      // Cargar los datos del paciente existente
      this.pacienteService
        .getPacienteById(this.pacienteId)
        .subscribe((paciente) => {
          if (paciente) {
            // Generar el formulario con los datos existentes
            const { formConfig, formGroup } =
              this.formService.generateFormAndConfig(
                pacienteBase, // Pasamos una instancia para que el servicio conozca la estructura
                'Editar Paciente',
                paciente // Pasamos los datos del paciente para pre-llenar
              );
            this.formConfig = formConfig;
            this.pacienteFormGroup = formGroup;
          } else {
            // Si el paciente no se encuentra, inicializa para crear uno nuevo
            this.initNewPacienteForm();
          }
        });
    } else {
      // Si no hay ID, inicializa el formulario para crear un nuevo paciente
      this.initNewPacienteForm();
    }
  }

  private initNewPacienteForm(): void {
    // Instancia vacía del DTO para que el servicio genere el formulario
    const nuevoPaciente: PatientDto = {
      id: '', // Se generará en el backend o en el servicio al guardar
      nombre: '',
      apellido: '',
      fechaNacimiento: new Date(), // Puedes poner un valor por defecto o dejarlo vacío
      genero: 'masculino', // Valor por defecto
      direccion: '',
      telefono: '',
      email: '',
    };

    const { formConfig, formGroup } = this.formService.generateFormAndConfig(
      nuevoPaciente,
      'Crear Nuevo Paciente'
    );
    this.formConfig = formConfig;
    this.pacienteFormGroup = formGroup;
  }

  onFormSubmit(formData: any): void {
    console.log('Datos del formulario enviados:', formData);
    // Aquí es donde conectarías con tu PacienteService para guardar o actualizar los datos
    if (this.modoEdicion) {
      // Asegúrate de enviar el ID en modo edición
      formData.id = this.pacienteId;
      this.pacienteService.updatePaciente(formData as PatientDto).subscribe(
        (response) => {
          console.log('Paciente actualizado con éxito:', response);
          // Lógica de éxito: mensaje, redirección, etc.
        },
        (error) => {
          console.error('Error al actualizar paciente:', error);
          // Lógica de error: mostrar mensaje al usuario
        }
      );
    } else {
      this.pacienteService.addPaciente(formData as PatientDto).subscribe(
        (response) => {
          console.log('Nuevo paciente creado con éxito:', response);
          // Lógica de éxito: mensaje, redirección, limpiar formulario
        },
        (error) => {
          console.error('Error al crear paciente:', error);
          // Lógica de error
        }
      );
    }
  }
}
