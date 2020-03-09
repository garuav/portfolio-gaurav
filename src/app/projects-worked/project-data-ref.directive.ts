import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appProjectDataRef]',
})
export class ProjectDataRefDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
