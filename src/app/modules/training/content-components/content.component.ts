import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ContentStatus =
  | 'ready'
  | 'inprogress'
  | 'finished'
  | 'gonext'
  | 'paused'
  | 'failed';

@Component({
  template: '',
  styles: [],
})
export abstract class ContentComponent {
  constructor() {}
  @Output() contentStatus = new EventEmitter<ContentStatus>();
  @Input() data: any;
}
