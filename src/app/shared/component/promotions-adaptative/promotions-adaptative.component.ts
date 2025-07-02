import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card'; // Para la versión móvil
import { CarouselModule } from 'primeng/carousel'; // Si prefieres un carrusel en móvil

// Para detectar breakpoints de forma reactiva
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-promotions-adaptative',
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    CardModule, // Importa si vas a usar Card
    CarouselModule,
  ],
  templateUrl: './promotions-adaptative.component.html',
  styleUrl: './promotions-adaptative.component.css',
})
export class PromotionsAdaptativeComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean = false;
  isMobile: boolean = false; // Bandera para saber si estamos en móvil

  // Datos de ejemplo para las promociones
  promotions = [
    {
      title: '¡20% de Descuento en Limpieza Dental!',
      description: 'Agenda tu cita antes del 31 de Agosto.',
      image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg', // Reemplaza con tus imágenes
      cta: 'Agendar Cita',
    },
    {
      title: 'Check-up Gratuito para Nuevos Pacientes',
      description:
        'Con tu primera consulta, recibe un diagnóstico completo sin costo.',
      image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
      cta: 'Más Detalles',
    },
    {
      title: 'Oferta Especial en Blanqueamiento',
      description:
        'Sonríe con confianza con nuestro tratamiento de blanqueamiento dental.',
      image: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
      cta: 'Ver Precios',
    },
  ];

  private destroy$ = new Subject<void>();

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    // Detecta si la pantalla es menor que un breakpoint 'medium'
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.isMobile = result.matches;
        // Si la pantalla se vuelve móvil mientras el sidebar está abierto, ciérralo
        if (this.isMobile && this.sidebarVisible) {
          this.sidebarVisible = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
