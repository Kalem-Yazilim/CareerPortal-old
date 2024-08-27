import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-personnel-cv',
  template: ``,
})
export abstract class BasePersonnelCvComponent {
  @Input() oid: number | string | null = '';
  @Output() addedEntity=new EventEmitter();
  // grid üzerinden gelen entity
  updateEntity: any;
}
