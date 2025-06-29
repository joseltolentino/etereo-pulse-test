import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';

// --- Interfaz definida aquí ---
export interface ClinicSearchItem {
  id: string;
  type: 'servicio' | 'doctor' | 'paciente' | 'cita' | 'especialidad';
  name: string;
  description?: string;
  keywords?: string[];
  routerLink?: string;
}

@Component({
  selector: 'app-header',
  imports: [
    MenubarModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
    CommonModule,
    AutoCompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  searchTerm: string = '';

  filteredResults: ClinicSearchItem[] = [];
  searchControl = new FormControl('');

  private clinicData: ClinicSearchItem[] = [
    {
      id: 's1',
      type: 'servicio',
      name: 'Medicina General',
      description: 'Consulta médica general.',
      routerLink: '/servicios/medicina-general',
    },
    {
      id: 's2',
      type: 'servicio',
      name: 'Pediatría',
      description: 'Atención especializada para niños.',
      routerLink: '/servicios/pediatria',
    },
    {
      id: 's3',
      type: 'servicio',
      name: 'Cardiología',
      description: 'Diagnóstico y tratamiento de enfermedades del corazón.',
      routerLink: '/servicios/cardiologia',
    },
    {
      id: 's4',
      type: 'servicio',
      name: 'Laboratorio Clínico',
      description: 'Análisis de sangre, orina y otros estudios.',
      routerLink: '/servicios/laboratorio',
    },
    {
      id: 's5',
      type: 'servicio',
      name: 'Rayos X',
      description: 'Imágenes diagnósticas por rayos X.',
      routerLink: '/servicios/rayos-x',
    },
    {
      id: 's6',
      type: 'servicio',
      name: 'Ecografías',
      description: 'Estudios de ultrasonido.',
      routerLink: '/servicios/ecografias',
    },
    {
      id: 'd1',
      type: 'doctor',
      name: 'Dr. Juan Pérez',
      description: 'Especialista en Medicina General.',
      keywords: ['juan', 'perez', 'doctor', 'medico', 'general'],
      routerLink: '/doctores/juan-perez',
    },
    {
      id: 'd2',
      type: 'doctor',
      name: 'Dra. Ana García',
      description: 'Pediatra certificada.',
      keywords: ['ana', 'garcia', 'pediatra', 'doctora', 'niños'],
      routerLink: '/doctores/ana-garcia',
    },
    {
      id: 'e1',
      type: 'especialidad',
      name: 'Oftalmología',
      description: 'Especialidad en salud visual.',
      routerLink: '/servicios/oftalmologia',
    },
    {
      id: 'e2',
      type: 'especialidad',
      name: 'Dermatología',
      description: 'Especialidad en enfermedades de la piel.',
      routerLink: '/servicios/dermatologia',
    },
    {
      id: 'p1',
      type: 'paciente',
      name: 'Paciente Ejemplo',
      description: 'Registro de paciente',
      keywords: ['ejemplo', 'paciente', 'registro'],
      routerLink: '/pacientes/registro',
    },
    {
      id: 'c1',
      type: 'cita',
      name: 'Agendar Cita',
      description: 'Reservar hora con un especialista',
      keywords: ['cita', 'agendar', 'reservar'],
      routerLink: '/citas/agendar',
    },
  ];

  constructor(public router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Servicios',
        icon: 'pi pi-fw pi-medkit', // Ícono de un botiquín o algo médico
        items: [
          {
            label: 'Consultas Médicas',
            icon: 'pi pi-fw pi-user', // Ícono de un paciente/doctor
            items: [
              {
                label: 'Medicina General',
                routerLink: '/servicios/medicina-general',
              },
              { label: 'Pediatría', routerLink: '/servicios/pediatria' },
              { label: 'Cardiología', routerLink: '/servicios/cardiologia' },
              { separator: true }, // Separador visual
              {
                label: 'Especialidades',
                routerLink: '/servicios/especialidades',
              },
            ],
          },
          {
            label: 'Exámenes y Diagnóstico',
            icon: 'pi pi-fw pi-stethoscope', // Ícono de estetoscopio
            items: [
              {
                label: 'Laboratorio Clínico',
                routerLink: '/servicios/laboratorio',
              },
              { label: 'Rayos X', routerLink: '/servicios/rayos-x' },
              { label: 'Ecografías', routerLink: '/servicios/ecografias' },
            ],
          },
          {
            label: 'Procedimientos',
            icon: 'pi pi-fw pi-cog', // Ícono de engranaje o procedimiento
            items: [
              { label: 'Curaciones', routerLink: '/servicios/curaciones' },
              { label: 'Vacunación', routerLink: '/servicios/vacunacion' },
            ],
          },
        ],
      },
      {
        label: 'Citas',
        icon: 'pi pi-fw pi-calendar', // Ícono de calendario
        items: [
          { label: 'Agendar Cita', routerLink: '/citas/agendar' },
          { label: 'Ver mis Citas', routerLink: '/citas/mis-citas' },
          { label: 'Cancelar Cita', routerLink: '/citas/cancelar' },
        ],
      },
      {
        label: 'Pacientes',
        icon: 'pi pi-fw pi-users', // Ícono de múltiples usuarios
        items: [
          { label: 'Registro de Pacientes', routerLink: '/pacientes/registro' },
          { label: 'Historial Clínico', routerLink: '/pacientes/historial' },
        ],
      },
      {
        label: 'Contacto',
        icon: 'pi pi-fw pi-info-circle', // Ícono de información
        routerLink: '/contacto', // Enlace directo sin submenú
      },
      {
        label: 'Abrir Contacto Directo',
        icon: 'pi pi-fw pi-phone',
        command: () => {
          alert('Llamando a la clínica...');
          // Aquí podrías abrir un modal, iniciar una llamada, etc.
        },
      },
    ];
    this.searchControl.valueChanges.subscribe((value) => {
      // The 'search' method will now be triggered by valueChanges
      // Pass an object with 'query' property, mimicking the event from (completeMethod)
      this.search({ query: value || '' }); // Ensure value is treated as string
    });
  }

  search(event: { query: string }) {
    console.log('Método search llamado con la query:', event.query);
    const query = event.query.toLowerCase().trim();

    if (query.length > 2) {
      this.filteredResults = this.clinicData.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          (item.description &&
            item.description.toLowerCase().includes(query)) ||
          (item.keywords &&
            item.keywords.some((keyword) =>
              keyword.toLowerCase().includes(query)
            )) ||
          item.type.toLowerCase().includes(query)
      );
      console.log(
        'Resultados filtrados (si la query > 2):',
        this.filteredResults
      );
    } else {
      this.filteredResults = [];
      console.log('Query demasiado corta, limpiando resultados.'); // Limpia las sugerencias si el query es muy corto
    }
  }

  // --- Método que se ejecuta cuando se selecciona una sugerencia ---
  handleSelect(selectedItem: ClinicSearchItem) {
    if (selectedItem.routerLink) {
      this.router.navigate([selectedItem.routerLink]);
      this.searchControl.setValue(''); // Limpia el input
      this.filteredResults = []; // Oculta las sugerencias
    }
  }
  onAutoCompleteBlur() {
    // Get the current value from the FormControl
    const currentQuery = this.searchControl.value || '';
    if (currentQuery.length > 2 && this.filteredResults.length === 0) {
      this.router.navigate(['/search-results'], {
        queryParams: { q: currentQuery },
      });
      this.searchControl.setValue('');
      this.filteredResults = [];
    }
  }
}
