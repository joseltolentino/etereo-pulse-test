import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { DividerModule } from 'primeng/divider';
import { Ripple } from 'primeng/ripple';
import { DrawerModule } from 'primeng/drawer';
import { StyleClass } from 'primeng/styleclass';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DividerModule,
    Ripple,
    StyleClass,
    DrawerModule,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  visible: boolean = false;
  isMobile: boolean = true; // Bandera para saber si estamos en móvil
  currentUrl: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        const goingMobile = result.matches;

        if (goingMobile) {
          // 1. Cierra el drawer antes de activar isMobile
          this.visible = false;

          // 2. Espera a que Angular limpie el DOM del p-drawer
          setTimeout(() => {
            this.isMobile = true;
          }, 50); // suficiente para que *ngIf lo retire y lo vuelva a montar
        } else {
          // Al volver a escritorio, también cierra para evitar overlay persistente
          this.visible = false;
          this.isMobile = false;
        }
      });
  }

  toggleSidebar(): void {
    // Solo abrir si el drawer ya está montado
    if (this.isMobile) {
      // Protección adicional para evitar apertura prematura
      setTimeout(() => {
        this.visible = true;
      }, 10); // Pequeña espera para asegurar que <p-drawer> existe en DOM
    } else {
      this.visible = !this.visible;
    }
  }
  onDrawerHide() {
    this.visible = false; // asegura que tu estado esté sincronizado
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
