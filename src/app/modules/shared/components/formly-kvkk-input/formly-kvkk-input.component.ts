import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-kvkk-input',
  templateUrl: 'formly-kvkk-input.component.html',
})
export class FormlyKvkkInputComponent extends FieldType<FieldTypeConfig> {
  constructor(private modalService: NgbModal) {
    super();
  }

  showModal(content: any) {
    this.modalService.open(content, { size: 'xl' });
    ///  { fullscreen: true } or  { size: 'xl' }
  }
}
