import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from '../../../../shared/component/dinamic-form/dinamic-form.component';
import { ButtonModule } from 'primeng/button';
import { FormConfig } from '../../../../core/interfaces/form-config';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { formConfigRegister } from '../../../../config/form-config-register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormComponent, // Asegúrate de que DynamicFormComponent esté importado
    ButtonModule,
    CardModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  // Implementa OnInit
  formGrup: FormGroup = new FormGroup({});
  formConfig = formConfigRegister;

  constructor(private messageService: MessageService, private router: Router) {}

  ngOnInit(): void {}

  /**
   * Captura el FormGroup emitido por el DynamicFormComponent.
   * @param form El FormGroup creado por el DynamicFormComponent.
   */
  onDynamicFormCreated(form: FormGroup) {
    this.formGrup = form;
    console.log('FormGroup del formulario dinámico recibido:', this.formGrup);
  }

  /**
   * Maneja el envío del formulario.
   */
  register() {
    // Verifica si el formulario es inválido. No se usa '?' porque formGrup siempre es una instancia.
    if (this.formGrup.invalid) {
      this.formGrup.markAllAsTouched(); // Marca todos los controles como tocados para mostrar errores visuales
      console.log('Formulario inválido. Errores:', this.formGrup.errors);
      // Muestra un toast de error por validación
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail:
          'Por favor, complete todos los campos requeridos y corrija los errores.',
      });
      return; // Detiene la ejecución si el formulario es inválido
    }

    const registrationData = this.formGrup.value;
    console.log('Datos enviados para registro:', registrationData);

    // --- Simulación de una llamada a un servicio de registro ---
    // En una aplicación real, aquí integrarías tu servicio de backend para enviar los datos.
    // Por ejemplo: this.authService.register(registrationData).subscribe(...)

    // Simulación de éxito/fracaso basada en datos específicos
    if (
      registrationData.username === 'nuevoUsuario' &&
      registrationData.password === 'passwordSegura'
    ) {
      // Muestra un toast de éxito si la simulación es exitosa
      this.messageService.add({
        severity: 'success',
        summary: 'Registro Exitoso',
        detail:
          '¡Su cuenta ha sido creada con éxito! Ahora puede iniciar sesión.',
      });
      // Opcional: Limpiar el formulario o redirigir al usuario
      this.formGrup.reset(); // Limpia los campos del formulario
      // this.router.navigate(['/login']); // Redirige al login si tienes un router inyectado
    } else {
      // Muestra un toast de error si la simulación falla
      this.messageService.add({
        severity: 'error',
        summary: 'Error en el Registro',
        detail:
          'No se pudo completar el registro. El nombre de usuario ya existe o hubo un problema.',
      });
    }
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
