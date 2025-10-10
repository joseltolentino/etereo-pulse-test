import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';

type TurnoGrupo = 'mañana' | 'tarde' | 'noche';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePicker,
    ButtonModule,
    CardModule,
    AccordionModule,
  ],
  providers: [DatePipe],
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class DateComponent implements OnInit {
  // ✅ Control reactivo con fecha inicial
  dateControl = new FormControl<Date>(new Date());

  selectedHora: string | null = null;
  grupos: TurnoGrupo[] = ['mañana', 'tarde', 'noche'];

  turnos: Record<TurnoGrupo, { label: string; value: string }[]> = {
    mañana: [
      { label: '7:45 a.m.', value: '07:45' },
      { label: '8:45 a.m.', value: '08:45' },
      { label: '9:45 a.m.', value: '09:45' },
      { label: '10:15 a.m.', value: '10:15' },
      { label: '10:45 a.m.', value: '10:45' },
      { label: '11:45 a.m.', value: '11:45' },
    ],
    tarde: [
      { label: '12:00 p.m.', value: '12:00' },
      { label: '12:15 p.m.', value: '12:15' },
      { label: '1:00 p.m.', value: '13:00' },
      { label: '2:00 p.m.', value: '14:00' },
      { label: '3:00 p.m.', value: '15:00' },
      { label: '4:00 p.m.', value: '16:00' },
    ],
    noche: [
      { label: '6:00 p.m.', value: '18:00' },
      { label: '7:00 p.m.', value: '19:00' },
      { label: '8:00 p.m.', value: '20:00' },
    ],
  };

  // ✅ Fecha formateada (usando Angular DatePipe)
  formattedDate = signal<string>('');

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.updateFormattedDate();

    // Actualiza el texto formateado cuando cambia el control
    this.dateControl.valueChanges.subscribe(() => this.updateFormattedDate());
  }

  private updateFormattedDate() {
    const date = this.dateControl.value ?? new Date();
    this.formattedDate.set(
      this.datePipe.transform(date, "EEEE, d 'de' MMMM 'de' y", 'es-ES') || ''
    );
  }

  nextDay() {
    const current = this.dateControl.value ?? new Date();
    const next = new Date(current);
    next.setDate(current.getDate() + 1);
    this.dateControl.setValue(next);
  }

  previousDay() {
    const current = this.dateControl.value ?? new Date();
    const prev = new Date(current);
    prev.setDate(current.getDate() - 1);
    this.dateControl.setValue(prev);
  }

  selectHora(value: string) {
    this.selectedHora = value;
  }

  isSelected(value: string) {
    return this.selectedHora === value;
  }
}
