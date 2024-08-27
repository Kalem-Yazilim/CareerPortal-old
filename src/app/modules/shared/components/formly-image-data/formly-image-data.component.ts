import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-image-data',
  templateUrl: './formly-image-data.component.html',
  styleUrls: ['./formly-image-data.component.scss'],
})
export class FormlyImageDataComponent extends FieldType<FieldTypeConfig> {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
