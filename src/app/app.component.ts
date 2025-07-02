import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DynamicFormComponent } from './shared/component/dinamic-form/dinamic-form.component';
import { PromotionsAdaptativeComponent } from './shared/component/promotions-adaptative/promotions-adaptative.component';
import { TableDynamicComponent } from './shared/component/table-dynamic/table-dynamic.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    DynamicFormComponent,
    PromotionsAdaptativeComponent,
    TableDynamicComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'etereo-pulse-web';
}
