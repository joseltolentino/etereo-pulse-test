import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-modal-dialog',
  imports: [Dialog, ButtonModule, InputTextModule, AvatarModule],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.css',
})
export class ModalDialogComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
