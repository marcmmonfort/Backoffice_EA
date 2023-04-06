import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() isOpen: boolean = false;
  @Output() acceptChanges = new EventEmitter();
  @Output() cancelChanges = new EventEmitter();

  onAccept(): void {
    this.acceptChanges.emit();
  }

  onCancel(): void {
    this.cancelChanges.emit();
  }
}
