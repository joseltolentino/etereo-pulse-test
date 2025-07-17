import { Component, OnInit } from '@angular/core';
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
  constructor() {}

  ngOnInit(): void {
    this.entity = JSON.parse(this.jsonConfigString);
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

    if (prop.validaciones.includes('required'))
      validators.push(Validators.required);

    const maxLengthRule = prop.validaciones.find((v: string) =>
      v.startsWith('maxLength')
    );

    if (maxLengthRule) {
      const value = parseInt(maxLengthRule.split(':')[1], 10);
      validators.push(Validators.maxLength(value));
    }
    return validators;
  }
}
