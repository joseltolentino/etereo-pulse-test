import { Component } from '@angular/core';
import { TableDynamicComponent } from '../../shared/component/table-dynamic/table-dynamic.component';
import { RouterOutlet } from '@angular/router';
import { DynamicFormComponent } from '../../shared/component/dinamic-form/dinamic-form.component';
import { PromotionsAdaptativeComponent } from '../../shared/component/promotions-adaptative/promotions-adaptative.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [
    TableDynamicComponent,
    RouterOutlet,
    DynamicFormComponent,
    PromotionsAdaptativeComponent,
    SidebarComponent,
    CommonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  sidebarVisible = true;
  isMobile = false;
}
