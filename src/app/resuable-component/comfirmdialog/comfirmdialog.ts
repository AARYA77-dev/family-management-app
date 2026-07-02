import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
export type ConfirmActionType = 'delete' | 'logout' | 'bulk';
@Component({
  selector: 'app-comfirmdialog',
  imports: [CommonModule],
  templateUrl: './comfirmdialog.html',
  styleUrl: './comfirmdialog.css',
})
export class Comfirmdialog {
 @Input() visible = false;
  @Input() message = '';
  @Input() title = 'Confirm';

  @Input() confirmText = 'Yes';
  @Input() cancelText = 'Cancel';

  @Input() type: ConfirmActionType = 'delete';

  @Output() ok = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  confirm() {
    this.ok.emit();
  }

  cancel() {
    this.cancelEvent.emit();
  }
}
