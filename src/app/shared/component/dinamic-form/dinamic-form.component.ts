/* import { Component, OnInit, Injector, inject, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormConfig, Propiedad } from '../../../core/interfaces/form-config';
import { InputComponentComponent } from '../mini-components/input-component/input-component.component';
import { SelectComponentComponent } from '../mini-components/select-component/select-component.component';
import { AutocompleteComponentComponent } from '../mini-components/autocomplete-component/autocomplete-component.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule],
  templateUrl: `./dinamic-form.component.html`,
  styleUrls: ['./dinamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  @Input() configFromParent!: FormConfig;

  entityForm!: FormGroup;
  entity!: FormConfig;
  controlsToRender: any[] = [];

  private jsonConfigString = `{
    "nombreEntidad": "Patients",
      "propiedades": [
        {
          "columnName": "Status",
          "label": "Estado",
          "inputType": "select",
          "placeholder": "Ingrese Estado",
          "maxLength": null,
          "isNullable": false,
          "selectItems": [
            {
              "value": "d4a0cd5d-57fe-46a4-aace-18e1441c70c9",
              "label": "En espera"
            },
            {
              "value": "1e7020ab-7c23-4fc9-91cb-1905b591a5f0",
              "label": "Atendido"
            },
            {
              "value": "65fe737f-31a0-4bc1-8039-252df3bac194",
              "label": "Reprogramado"
            }
          ],
          "validaciones": [
            "required"
          ]
        },
        {
          "columnName": "DocumentNumber",
          "label": "Número de documento",
          "inputType": "text",
          "placeholder": "Ingrese Número de documento",
          "maxLength": 22,
          "isNullable": false,
          "selectItems": null,
          "validaciones": [
            "required",
            "maxLength:22"
          ]
        },
        {
          "columnName": "DocumentTypeId",
          "label": "Tipo de documento",
          "inputType": "autocomplete",
          "placeholder": "Ingrese Tipo de documento",
          "maxLength": null,
          "isNullable": false,
          "selectItems": [
            {
              "value": "d4a0cd5d-57fe-46a4-aace-18e1441c70c9",
              "label": "Cédula"
            },
            {
              "value": "1e7020ab-7c23-4fc9-91cb-1905b591a5f0",
              "label": "RUC"
            },
            {
              "value": "65fe737f-31a0-4bc1-8039-252df3bac194",
              "label": "ID Policial"
            },
            {
              "value": "d7ad71f9-b684-4449-87d2-255309a3cb0f",
              "label": "Permiso Temporal"
            },
            {
              "value": "60c3d34f-993a-4c5d-95cb-3c23a0bf0304",
              "label": "Tarjeta de Identidad"
            },
            {
              "value": "cfa24b45-e370-4b4b-9a0d-5040f1b82b10",
              "label": "DNI"
            },
            {
              "value": "e5ac6045-5a90-445d-a913-759fc93a73e2",
              "label": "Documento Provisional"
            },
            {
              "value": "91ff333d-8835-4ca9-b77e-9311434e9d8d",
              "label": "ID Militar"
            },
            {
              "value": "6943836e-c9f9-471d-a660-abe8d5707033",
              "label": "Licencia de Conducir"
            },
            {
              "value": "16164b3a-a91b-426c-bf2c-b295dc3965ac",
              "label": "DNI"
            },
            {
              "value": "564a26b6-1869-4117-bf58-e5c6171a22cd",
              "label": "Pasaporte Diplomático"
            },
            {
              "value": "80666882-6f34-422d-8278-e8d1fff8a16c",
              "label": "Carné de Extranjería"
            },
            {
              "value": "9374dde7-0919-4d04-9dab-f47921f08390",
              "label": "Pasaporte"
            }
          ],
          "validaciones": [
            "required"
          ]
        },
        {
          "columnName": "Email",
          "label": "Correo electrónico",
          "inputType": "text",
          "placeholder": "Ingrese Correo electrónico",
          "maxLength": 256,
          "isNullable": false,
          "selectItems": null,
          "validaciones": [
            "required",
            "maxLength:256"
          ]
        },
        {
          "columnName": "MaternalSurname",
          "label": "Apellido materno",
          "inputType": "text",
          "placeholder": "Ingrese Apellido materno",
          "maxLength": 100,
          "isNullable": false,
          "selectItems": null,
          "validaciones": [
            "required",
            "maxLength:100"
          ]
        },
        {
          "columnName": "Name",
          "label": "Nombres",
          "inputType": "text",
          "placeholder": "Ingrese Nombres",
          "maxLength": 100,
          "isNullable": false,
          "selectItems": null,
          "validaciones": [
            "required",
            "maxLength:100"
          ]
        },
        {
          "columnName": "PaternalSurname",
          "label": "Apellido paterno",
          "inputType": "text",
          "placeholder": "Ingrese Apellido paterno",
          "maxLength": 100,
          "isNullable": false,
          "selectItems": null,
          "validaciones": [
            "required",
            "maxLength:100"
          ]
        },
        {
          "columnName": "Phone",
          "label": "Teléfono",
          "inputType": "text",
          "placeholder": "Ingrese Teléfono",
          "maxLength": 20,
          "isNullable": false,
          "selectItems": null,
          "validaciones": [
            "required",
            "maxLength:20"
          ]
        }
      ]
    }`;
  private injector = inject(Injector);
  constructor() {}

  ngOnInit(): void {
    
    this.entity = this.configFromParent || JSON.parse(this.jsonConfigString);
    console.log(this.entity);
    this.buildForm();
  }

  buildForm() {
    const group: Record<string, FormControl> = {};
    const controls: any[] = [];

    for (const prop of this.entity.propiedades) {
      const validators = this.getValidatorsToControl(prop);

      const control = new FormControl('', validators);

      group[prop.columnName] = control;

      if (prop.inputType === 'text') {
        controls.push({
          component: InputComponentComponent,
          props: {
            control,
            id: prop.columnName,
            label: prop.label,
            placeholder: prop.placeholder,
          },
        });
      }
      if (prop.inputType === 'select') {
        controls.push({
          component: SelectComponentComponent,
          props: {
            control,
            id: prop.columnName,
            label: prop.label,
            placeholder: prop.placeholder,
            options: prop.selectItems || [],
          },
        });
      }
      if (prop.inputType === 'autocomplete') {
        controls.push({
          component: AutocompleteComponentComponent,
          props: {
            control,
            id: prop.columnName,
            label: prop.label,
            placeholder: prop.placeholder,
            options: prop.selectItems || [],
          },
        });
      }
    }

    this.entityForm = new FormGroup(group);
    this.controlsToRender = controls;
  }


  getValidatorsToControl(prop: Propiedad) {
    const validators = [];

    const validaciones = Array.isArray(prop.validaciones)
      ? prop.validaciones
      : [];

    if (validaciones.includes('required')) {
      validators.push(Validators.required);
    }

    const maxLengthRule = validaciones.find((v: string) =>
      v.startsWith('maxLength:')
    );
    if (maxLengthRule) {
      const max = parseInt(maxLengthRule.split(':')[1], 10);
      validators.push(Validators.maxLength(max));
    }

    const minLengthRule = validaciones.find((v: string) =>
      v.startsWith('minLength:')
    );
    if (minLengthRule) {
      const min = parseInt(minLengthRule.split(':')[1], 10);
      validators.push(Validators.minLength(min));
    }

    return validators;
  }

  createInjector(data: Record<string, any>) {
    return Injector.create({
      providers: Object.keys(data).map((key) => ({
        provide: key,
        useValue: data[key],
      })),
      parent: this.injector,
    });
  }
}
 */
/*gemini*/
import {
  Component,
  OnInit,
  Injector,
  inject,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  Signal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn, // Importa ValidatorFn
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormConfig, Propiedad } from '../../../core/interfaces/form-config';
import { InputComponentComponent } from '../mini-components/input-component/input-component.component';
import { SelectComponentComponent } from '../mini-components/select-component/select-component.component';
import { AutocompleteComponentComponent } from '../mini-components/autocomplete-component/autocomplete-component.component';
import { CardModule } from 'primeng/card';
import { PasswordComponent } from '../mini-components/password/password.component';
import { TextareaComponent } from '../mini-components/textarea/textarea.component';
import { DatepickerComponent } from '../mini-components/datepicker/datepicker.component';
import { CheckboxComponent } from '../mini-components/checkbox/checkbox.component';

export interface PropiedadConValor extends Propiedad {
  value?: any; // La propiedad value ahora es opcional
}
export interface FormConfigConValor extends FormConfig {
  propiedades: PropiedadConValor[];
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    // Asegúrate de importar los componentes dinámicos aquí
    InputComponentComponent,
    SelectComponentComponent,
    AutocompleteComponentComponent,
    PasswordComponent,
    TextareaComponent,
    DatepickerComponent,
    CheckboxComponent,
  ],
  templateUrl: `./dinamic-form.component.html`,
  styleUrls: ['./dinamic-form.component.css'],
})
export class DynamicFormComponent {
  @Input() tipoDeDiseno: 'moderno' | 'clasico' | 'modernoII' = 'moderno';
  @Input() configFromParent!: FormConfigConValor; // Input para recibir la configuración del padre
  @Output() formCreated = new EventEmitter<FormGroup>(); // Evento para emitir el FormGroup creado
  @Input() searchFunctions!: { [key: string]: (query: string) => void };
  @Input() searchOptions!: { [key: string]: Signal<any[]> };

  entityForm!: FormGroup;
  entity!: FormConfigConValor;
  controlsToRender: any[] = [];

  // Eliminamos el jsonConfigString hardcodeado, ahora usaremos configFromParent

  protected injector = inject(Injector); // Inyector para ngComponentOutlet

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // Si la configuración cambia (por ejemplo, llega después de una carga HTTP)
    if (changes['configFromParent'] && this.configFromParent) {
      this.entity = this.configFromParent;
      this.buildForm();
      this.formCreated.emit(this.entityForm);
    }
  }

  /**
   * Construye el FormGroup y la lista de controles a renderizar.
   */
  buildForm() {
    const group: Record<string, FormControl> = {};
    const controls: any[] = [];

    for (const prop of this.configFromParent.propiedades) {
      const validators = this.getValidatorsToControl(prop);
      const control = new FormControl(
        { value: prop.value ?? '', disabled: prop.isReadOnly ?? false }, // ✅ Ahora se pasa el valor directamente
        validators
      );

      group[prop.columnName] = control;

      // Determina qué componente renderizar según el inputType
      switch (prop.inputType) {
        case 'text':
          // Añade 'password' para usar el mismo InputComponentComponent
          controls.push({
            component: InputComponentComponent,
            props: {
              control,
              id: prop.columnName,
              label: prop.label,
              placeholder: prop.placeholder,
              type: prop.inputType, // Pasa el tipo de input (text, password)
            },
          });
          break;
        case 'password':
          controls.push({
            component: PasswordComponent,
            props: {
              control,
              id: prop.columnName,
              label: prop.label,
              placeholder: prop.placeholder,
            },
          });
          break;
        case 'select':
          controls.push({
            component: SelectComponentComponent,
            props: {
              control,
              id: prop.columnName,
              label: prop.label,
              placeholder: prop.placeholder,
              options: prop.selectItems || [],
            },
          });
          break;
        case 'autocomplete':
          if (prop.searchKey && this.searchFunctions && this.searchOptions) {
            controls.push({
              component: AutocompleteComponentComponent,
              props: {
                control,
                id: prop.columnName,
                label: prop.label,
                placeholder: prop.placeholder,
                filterFunction: this.searchFunctions[prop.searchKey!],
                suggestions: this.searchOptions[prop.searchKey!], // 👈 lee el signal aquí
              },
            });
          } else {
            // Esto te dará una alerta si olvidas configurar el searchKey en el futuro
            console.warn(
              `Autocomplete field '${prop.columnName}' is missing 'searchKey'.`
            );
          }
          break;
        case 'textarea':
          controls.push({
            component: TextareaComponent,
            props: {
              control,
              id: prop.columnName,
              label: prop.label,
              placeholder: prop.placeholder,
            },
          });
          break;
        case 'date':
          controls.push({
            component: DatepickerComponent,
            props: {
              control,
              id: prop.columnName,
              label: prop.label,
              placeholder: prop.placeholder,
            },
          });
          break;
        case 'checkbox':
          controls.push({
            component: CheckboxComponent,
            props: {
              control,
              id: prop.columnName,
              label: prop.label,
            },
          });
          break;
        default:
          console.warn(
            `Tipo de input no soportado: ${prop.inputType} para ${prop.columnName}`
          );
          break;
      }
    }

    this.entityForm = new FormGroup(group);
    this.controlsToRender = controls;
    this.entityForm.enable();
  }

  private getValidatorsToControl(prop: Propiedad): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (prop.validaciones) {
      for (const validation of prop.validaciones) {
        if (validation === 'required') {
          validators.push(Validators.required);
        } else if (validation.startsWith('minLength:')) {
          const minLength = parseInt(validation.split(':')[1], 10);
          validators.push(Validators.minLength(minLength));
        } else if (validation.startsWith('maxLength:')) {
          const maxLength = parseInt(validation.split(':')[1], 10);
          validators.push(Validators.maxLength(maxLength));
        } else if (validation === 'email') {
          validators.push(Validators.email);
        }
        // Puedes añadir más validadores aquí (pattern, min, max, etc.)
      }
    }
    return validators;
  }
}
