import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-seperated-number',
  templateUrl: './formly-seperated-number.component.html',
  styleUrls: ['./formly-seperated-number.component.scss'],
})
export class FormlySeperatedNumberComponent extends FieldType<FieldTypeConfig> {
  constructor() {
    super();
  }
  get type() {
    return this.props.type || 'text';
  }

  get mask() {
    return this.props['mask'] ?? 'separator.2';
  }

  get thousandSeperator() {
    return this.props['seperator'] ?? '.';
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
