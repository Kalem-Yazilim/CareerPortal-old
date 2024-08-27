import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-phone-type',
  templateUrl: './formly-phone-type.component.html',
  styleUrls: ['./formly-phone-type.component.scss'],
})
export class FormlyPhoneTypeComponent extends FieldType<FieldTypeConfig> {
  constructor() {
    super();
  }
  get type() {
    return this.props.type || 'text';
  }

  get mask() {
    return this.props['mask'] ?? '(000) 000-0000';
  }

  get prefix() {
    return this.props['prefix'] ?? '';
  }

  get horizontal(): boolean {
    return this.props['horizontal'] ?? false;
  }

  get required(): boolean {
    return this.props['required'] ?? false;
  }
}
