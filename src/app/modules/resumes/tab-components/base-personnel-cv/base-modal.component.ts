import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasePersonnelCvComponent } from './base-personnel-cv.component';

@Component({
  template: ``,
})
export abstract class BaseModalComponent extends BasePersonnelCvComponent {
  @Output() isEntityAdded = new EventEmitter<boolean>();
  @Input() updateModel: any;

  entityAdded(value: boolean) {
    this.isEntityAdded.emit(value);
  }
}
