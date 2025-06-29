import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule  } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-component',
  imports: [InputTextModule, ReactiveFormsModule ],
  templateUrl: './input-component.component.html',
  styleUrl: './input-component.component.css'
})
export class InputComponentComponent {

  @Input() control!: FormControl;
  @Input() id!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
}
