import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-payment',
  imports: [CardModule, RadioButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  formGroup!: FormGroup<any>;

  payment: any[] = [
    { name: 'Efectivo', key: 'E' },
    { name: 'Tarjeta', key: 'T' },
    { name: 'Transferencia/Plin/Yape', key: 'TPY' },
  ];

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(),
    });
  }
}
