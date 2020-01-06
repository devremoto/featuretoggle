import { Directive, ElementRef, AfterViewChecked } from '@angular/core';
declare var $: any;
@Directive({
  selector: '[appNlbr]'
})
export class NlbrDirective implements AfterViewChecked {
  constructor(private el: ElementRef) {
  }

  ngAfterViewChecked(): void {
    this.replace();
  }

  replace() {
    const element = $(this.el.nativeElement);
    if (element.text().trim()) {
      element.html(element.text().replace(/\n/gi, '<br />'));
    }
  }

}
