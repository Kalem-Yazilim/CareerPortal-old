import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[contentHost]',
})
export class ContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
