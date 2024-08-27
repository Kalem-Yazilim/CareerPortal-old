import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-yes-no-modal',
  templateUrl: './yes-no-modal.component.html',
  styleUrls: ['./yes-no-modal.component.scss'],
})
export class YesNoModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  @Input() question: string;

  answer(res: boolean) {
    this.activeModal.close({res});
  }
}
